import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import _ from 'underscore'

const QueueComponent = React.createClass({

	_makeMatches: function(matches){
	
		var matchArray = []

		for(var i = 0; i < matches.length; i++){

			var match = matches[i].attributes

			if(match.players.length > 0){

				var players = match.players[0].email

			}

			else{

				var players = 'no players'

			}

			if(match.status != 'complete'){

				matchArray.push(<MatchComponent matches={this.props.queueMatches} match={matches[i].attributes} matchName={matches[i].attributes.name} matchPlayers={players} />)
				
			}

		}

		return(matchArray)

	},

	render: function(){

		if(this.props.queueMatches){

			return(

			<div className="col s6 container center-align m6 green accent-4">

				<div className = 'card green accent-4'>

					<div className="">
						{this._makeMatches(this.props.queueMatches)}
					</div>

				</div>

			</div>

			)

		}

		else{

			return(<div><h3>retrieving matches</h3></div>)

		}
	}
})

const MatchComponent = React.createClass({

	delete_match: function(evtObj){

		evtObj.preventDefault()
		ACTIONS.delete_match(this.props.match._id)

	},

	render: function(){

		var showCompleteButton = false

		if(this.props.match.game_type === 'ffa'){
			var gameType = 'free-for-all'
		}

		if(this.props.match.game_type === 'team'){
			var gameType = 'team deathmatch'
		}

		if(this.props.match.game_type === 'dual'){
			var gameType = 'one vs one'
		}

		var activeMatch = _.find(this.props.matches, function(match){
		
			if(match.status != 'complete'){
				return match
			}

		})

		if(activeMatch != undefined){
		
			if(this.props.match._id === activeMatch.attributes._id){
			 	var showCompleteButton = true
			}
		
		}

		return(

			<div className="col s6 container center-align m6 offset-m3 green accent-4">

				<div className = 'card green accent-3'>

					<h5 className = "card-content card-title white-text">{this.props.matchName}</h5>
					<h5 className = "card-content white-text">{gameType}</h5>
					
					<PlayersOfMatchComponent showCompleteBtn = {showCompleteButton} match={this.props.match} players={this.props.match.players} />
					
					<button onClick={this.delete_match}>remove</button>

				</div>

			</div>

		)
	}
})

const PlayersOfMatchComponent = React.createClass({

	_handleSubmit: function(evt){

		evt.preventDefault()
		var scoreInputs = evt.target.score,
		scoresObj = {},
		playerAndScore = [],
		winningTeam = "",
		winningTeamScore = 0,
		losingTeam = "",
		losingTeamScore = 0

		for(var i = 0; i < scoreInputs.length; i++){
			console.log(scoreInputs[i])
			var playerId = scoreInputs[i].id
			var playerScore = scoreInputs[i].value
			scoresObj[playerId] = playerScore
			playerAndScore.push({'player': playerId, 'score': Number(playerScore)})

		}

		if(this.props.match.game_type === 'team'){

			var team1 = this.props.match.team1
			var team1Score = 0

			for(var i = 0; i < team1.length; i++){

				var player = team1[i]._id
				var theirScore = Number(scoresObj[player])
				var team1Score = Number(team1Score + theirScore)

			}

			var team2 = this.props.match.team2

			var team2Score = 0

			for(var i = 0; i < team2.length; i++){

				var player = team2[i]._id
				var theirScore = Number(scoresObj[player])
				var team2Score = Number(team2Score) + theirScore

			}

			var winningTeamScore = _.max([team1Score,team2Score], function(teamScore){ 
			return teamScore })

			if(winningTeamScore === team2Score){
				winningTeam = this.props.match.team2_name
				losingTeamScore = team1Score
				losingTeam = this.props.match.team1_name
			}
			else{
				winningTeam = this.props.match.team1_name
				losingTeam = this.props.match.team2_name
				losingTeamScore = team2Score
			}
			
		}

		var winningPlayer = _.max(playerAndScore, function(aPlayerScore){ 
			return aPlayerScore.score })

		console.log('completing the match')
		ACTIONS.update_match_scores(scoresObj, this.props.match._id, winningPlayer.score, winningPlayer.player, winningTeam, winningTeamScore, losingTeam, losingTeamScore)

	},
	
	_makePlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayerComponent gameType={this.props.match.game_type} team1={this.props.match.team1} team2={this.props.match.team2} player={players[i]} />)
		}

		return playersArray

	},

	render: function(){

		var team = ''


		if(this.props.match.game_type === 'team'){
			var teamDisplay = true
			var nonTeamDisplay = false
			var team1Name = this.props.match.team1_name
			var team2Name = this.props.match.team2_name
		}
		else{
			var teamDisplay = false
			var nonTeamDisplay = true
			var team1Name = 'team 1'
			var team2Name = 'team 2'
		}

		if(teamDisplay != true){

			return(

				<form className="card-content container green accent-3" onSubmit={this._handleSubmit} name={this.props.match._id} className="">

					<ul className="collection">
					{this._makePlayers(this.props.players)}
					</ul>
					<button className={this.props.showCompleteBtn ? '' : 'hide'} type='submit'>complete</button>
						
				</form>

			)

		}

		else{

			return(

				<form className="card-content container" onSubmit={this._handleSubmit} name={this.props.match._id}>

					<h6 className="white-text card-content">{team1Name}</h6>

					<ul className="collection card-content">{this._makePlayers(this.props.match.team1)}</ul>

					<h6 className="white-text card-content">{team2Name}</h6>

					<ul className="collection card-content">{this._makePlayers(this.props.match.team2)}</ul>

					<button className={this.props.showCompleteBtn ? '' : 'hide'} type='submit'>complete</button>

				</form>

			)
		}
	}

})

const PlayerComponent = React.createClass({

	render: function(){


		return(

			<li className="collection-item avatar green accent-4 white-text">
			<img className="circle" src={this.props.player.avatar_url} />
			{this.props.player.name}
			<input name='score' id={this.props.player._id} placeholder='enter score' />
			</li>

		)
	}

})

export default QueueComponent