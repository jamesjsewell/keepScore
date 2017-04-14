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

			if(match.arena === STORE.data.selected_user.current_arena._id && match.status != 'complete'){

				matchArray.push(<MatchComponent matches={this.props.queueMatches} match={matches[i].attributes} matchName={matches[i].attributes.name} matchPlayers={players} />)
				
			}

		}

		return(matchArray)

	},

	render: function(){

		if(this.props.queueMatches){

			return(

				<div className='queue-wrapper'>

					{this._makeMatches(this.props.queueMatches)}

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
		console.log(this.props.match._id)
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

		if(this.props.matches[0].attributes._id === this.props.match._id){
			var showCompleteButton = true
		}

		return(

			<div className = 'match-wrapper'>

				<h2>{this.props.matchName}</h2>
				<h3>{gameType}</h3>
				<PlayersOfMatchComponent showCompleteBtn = {showCompleteButton} match={this.props.match} players={this.props.match.players} />
				<button onClick={this.delete_match}>remove</button>

			</div>

		)
	}
})

const PlayersOfMatchComponent = React.createClass({

	_handleSubmit: function(evt){

		evt.preventDefault()
		var scoreInputs = evt.target.score
		var scoresObj = {}
		var playerAndScore = []

		for(var i = 0; i < scoreInputs.length; i++){

			var playerId = scoreInputs[i].id
			var playerScore = scoreInputs[i].value
			scoresObj[playerId] = playerScore
			playerAndScore.push({'player': playerId, 'score': Number(playerScore)})

		}

		var winningPlayer = _.max(playerAndScore, function(aPlayerScore){ 
			return aPlayerScore.score })
		
		ACTIONS.update_match_scores(scoresObj, this.props.match._id, winningPlayer.score, winningPlayer.player)
		//collect data, update the matches scores array. the array of scores will be objects for each player.
		//the object name will be the id of the player. the value will be the player's score.

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
		}
		else{
			var teamDisplay = false
			var nonTeamDisplay = true
		}

		return(

			<div className = 'players-of-match-wrapper'>

				<form onSubmit={this._handleSubmit} name={this.props.match._id} className={teamDisplay ? 'hidden' : ''}>

					{this._makePlayers(this.props.players)}
					<button className={this.props.showCompleteBtn ? '' : 'hidden'} type='submit'>complete</button>

				</form>

				<div className={teamDisplay ? '' : 'hidden'}>

					<h3>team 1</h3>
					<div>{this._makePlayers(this.props.match.team1)}</div>

					<h3>team 2</h3>
					<div>{this._makePlayers(this.props.match.team2)}</div>

				</div>


			</div>

		)
	}

})

const PlayerComponent = React.createClass({

	render: function(){


		return(

			<div className = 'player-of-match-wrapper'>

				<p>{this.props.player.name}</p>
				<input name='score' id={this.props.player._id} placeholder='enter score' />

			</div>

		)
	}

})

export default QueueComponent