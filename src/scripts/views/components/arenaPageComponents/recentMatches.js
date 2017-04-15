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

				<div className='recent-matches-wrapper'>

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

		
		if(this.props.match.game_type === 'ffa'){
			var gameType = 'free-for-all'
		}

		if(this.props.match.game_type === 'team'){
			var gameType = 'team deathmatch'
		}

		if(this.props.match.game_type === 'dual'){
			var gameType = 'one vs one'
		}

		return(

			<div className = 'match-wrapper'>

				<h2>{this.props.matchName}</h2>
				<h3>{gameType}</h3>
				<p>{this.props.match.winning_player.name} won with a score of &nbsp; {this.props.match.winning_score}</p>
				<PlayersOfMatchComponent  match={this.props.match} players={this.props.match.players} />
				<button onClick={this.delete_match}>remove</button>
				<p>{moment(this.props.match.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

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

				<form onSubmit={this._handleSubmit} name={this.props.match._id} className={teamDisplay ? 'hidden' : ''}>

					{this._makePlayers(this.props.players)}

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

				<p>{this.props.player.name}: {this.props.score}</p>

			</div>

		)
	}

})

export default RecentMatchesComponent