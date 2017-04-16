import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'


const CreateMatchComponent = React.createClass({

	_setGameType: function(evt){

		evt.preventDefault()
		STORE._set({match_create_type: evt.target.value})
		STORE._set({suggested_players: [] })
		STORE._set({selected_players_team: []})

	},

	_handleSubmit: function(evt){

		evt.preventDefault()

		if(STORE.data.match_create_type === 'ffa' || STORE.data.match_create_type === 'dual'){

			var playerInputsArray = []

			var players = evt.target[STORE.data.match_create_type === 'ffa' ? 'freeForAll' : 'dual']

			if(players != undefined){

				for(var i = 0; i < players.length; i++){

					if(players[i].checked === true){

						playerInputsArray.push(players[i].value)

					}

				}

				ACTIONS.create_match(STORE.data.match_create_type, playerInputsArray, evt.target.matchName.value)

			}
			

		}

		if(STORE.data.match_create_type === 'team'){

			var selectedPlayers = []
			var teamPlayers = evt.target.teamPlayer
			var assignedTeams = evt.target.teamSelect
			var team1Name = evt.target.team1Name.value
			var team2Name = evt.target.team2Name.value
			console.log(team1Name, team2Name)
			var team1Players = []
			var team2Players = []

			for(var i = 0; i < teamPlayers.length; i++){

				if(teamPlayers[i].checked === true){
					console.log(teamPlayers[i])
					selectedPlayers.push(teamPlayers[i].value)
					if(assignedTeams[i].value === 'team1'){
						team1Players.push(teamPlayers[i].value)
					}
					if(assignedTeams[i].value === 'team2'){
						team2Players.push(teamPlayers[i].value)
					}
				}
			}

			ACTIONS.create_match('team', selectedPlayers, evt.target.matchName.value, team1Players, team2Players)

		}

	},

	render: function(){

		return(

			<div className = 'create-match-wrapper'>
				
				<form className = 'create-match-form' onSubmit={this._handleSubmit}>

					<input type='text' name='matchName' placeholder='define match name'/>

					<select name="gameType" onChange={this._setGameType} >

					    <option value="dual">dual</option>
					    <option value="ffa">free for all</option>
					    <option value="team">team</option>
			
  					</select>

  					<PlayerChoiceComponent gameType={STORE.data.match_create_type} players={this.props.arena.attributes.players}/>

  					<button type='submit'>create match</button>

				</form>

				

			</div>

		)

	}

})

export default CreateMatchComponent