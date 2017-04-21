import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import moment from 'moment'
moment().format();

const RecentMatchesComponent = React.createClass({

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

			if(match.status === 'complete'){

				matchArray.push(<MatchComponent matches={this.props.queueMatches} match={matches[i].attributes} matchName={matches[i].attributes.name} matchPlayers={players} />)
				
			}

		}

		return(matchArray)

	},

	render: function(){

		if(this.props.queueMatches){

			return(

				<div className="col s3 container center-align m6 green accent-4">

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
		ACTIONS.delete_match(this.props.match._id)

	},

	render: function(){

		var winner = this.props.match.winning_player.name
		var winningScore = this.props.match.winning_score
		var loser = this.props.match.losing_team
		var losingScore = this.props.match.losing_team_score
		var showTeamDetails = false

		if(this.props.match.game_type === 'ffa'){
			var gameType = 'free-for-all'
		}

		if(this.props.match.game_type === 'team'){
			winner = this.props.match.winning_team
			winningScore = this.props.match.winning_team_score
			var loser = this.props.match.losing_team
			var losingScore = this.props.match.losing_team_score
			showTeamDetails = true
			var gameType = 'team deathmatch'
		}

		if(this.props.match.game_type === 'dual'){
			var gameType = 'one vs one'
		}

		return(
			//<button className="chip waves-effect waves-light btn" onClick={this.delete_match}>remove</button>
			<div className="col s6 container center-align m6 offset-m3 green accent-4">

				<div className = 'card green accent-3'>

					<h3 className="card-title card-content white-text center-align">{this.props.matchName}</h3>
					<h5 className="card-content white-text center-align">{gameType}</h5>
					<h5 className="card-content white-text">{winner} won with a score of {winningScore}</h5>
					<p className={showTeamDetails ? 'white-text card-content center-align' : 'hide'} >{loser} lost with a score of {losingScore}</p>
					<p className="card-content white-text center-align">{this.props.match.winning_player.name} was the top player and scored {this.props.match.winning_score}</p>
					<PlayersOfMatchComponent  match={this.props.match} players={this.props.match.players} />
					<p className="card-content white-text">{moment(this.props.match.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

				</div>

			</div>

		)
	}
})

const PlayersOfMatchComponent = React.createClass({
	
	_makePlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			var scores = this.props.match.scores

			var score = scores[players[i]._id]

			playersArray.push(<PlayerComponent score={score} gameType={this.props.match.game_type} team1={this.props.match.team1} team2={this.props.match.team2} player={players[i]} />)
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

				<form onSubmit={this._handleSubmit} name={this.props.match._id} className={teamDisplay ? 'hide' : 'card-content'}>

					<ul className="card-content collection">{this._makePlayers(this.props.players)}</ul>

				</form>

				<div className={teamDisplay ? '' : 'hide'}>
		
					<h5 className="white-text card-content">{this.props.match.team1_name}</h5>
					<ul className="collection card-content">{this._makePlayers(this.props.match.team1)}</ul>

					<h5 className="white-text card-content">{this.props.match.team2_name}</h5>
					<ul className="collection card-content">{this._makePlayers(this.props.match.team2)}</ul>

				</div>

			</div>

		)
	}

})

const PlayerComponent = React.createClass({

	render: function(){

		return(


			<li className = "collection-item avatar card-content green accent-4">

			<img className = "circle" src={this.props.player.avatar_url} />

			<p className = "white-text">{this.props.player.name}</p>

			<p className = "white-text">score: {this.props.score}</p>

			</li>

		)
	}

})

export default RecentMatchesComponent