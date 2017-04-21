import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import _ from 'underscore'

const TeamsComponent = React.createClass({

	_makeTeams: function(teams){
	
		var teamArray = []

		for(var i = 0; i < teams.length; i++){

			var team = teams[i].attributes

			if(team.players.length > 0){

				var players = team.players[0].email

			}

			else{

				var players = 'no players'

			}

			if(team.status != 'complete'){

				teamArray.push(<TeamComponent teams={this.props.arenaTeams} team={teams[i].attributes} teamName={teams[i].attributes.name} teamPlayers={players} />)
				
			}

		}

		return(teamArray)

	},

	render: function(){

		if(this.props.arenaTeams){

			return(

				<div className='queue-wrapper'>

					{this._makeTeams(this.props.arenaTeams)}

				</div>

			)

		}

		else{

			return(<div><h3>retrieving teams</h3></div>)

		}
	}
})

const TeamComponent = React.createClass({

	delete_team: function(evtObj){

		evtObj.preventDefault()
		ACTIONS.delete_team(this.props.team._id)

	},

	render: function(){
		
		return(

			<div className="col s6 container center-align m6 offset-m3 green accent-4">

				<div className = 'card green accent-3'>

					<h2 className="card-content card-title white-text center-align">{this.props.teamName}</h2>
					<PlayersOfTeamComponent team={this.props.team} players={this.props.team.players} />
					<button className='btn green accent-1 green-text flow-text' onClick={this.delete_team}>remove</button>

				</div>

			</div>

		)
	}
})

const PlayersOfTeamComponent = React.createClass({

	_handleSubmit: function(evt){

		
	},
	
	_makePlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayerComponent team1={this.props.team} player={players[i]} />)
		}

		return playersArray

	},

	render: function(){


		return(

			<div className = 'players-of-team-wrapper'>

				{this._makePlayers(this.props.players)}

			</div>

		)
	}

})

const PlayerComponent = React.createClass({

	render: function(){

		return(

			<div className="chip avatar">
			<img src={this.props.player.avatar_url} />
			<label htmlFor={this.props.player._id} > {this.props.player.name} </label>	
			</div>

		)
	}

})

export default TeamsComponent