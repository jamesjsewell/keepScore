import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import _ from 'underscore'
import PlayerChoiceComponent from './playerSelect.js'


const CreateMatchComponent = React.createClass({

	_setGameType: function(evt){

		console.log('changed game type')
		evt.preventDefault()
		STORE._set({match_create_type: evt.target.value})
		STORE._set({suggested_players: [] })
		STORE._set({selected_players_match: []})
		
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
			
			var team1 = evt.target.team[0]
			var team2 = evt.target.team[1]
			var team1Id = team1.value
			var team2Id = team2.value

			var team1Obj = this.props.arenaTeams.filter(function(team){

				if(team.attributes._id === team1Id){
					return team
				}
			})

			var team2Obj = this.props.arenaTeams.filter(function(team){

				if(team.attributes._id === team2Id){
					return team
				}
			})

			console.log(team1Obj[0].attributes.players,'team1')
			console.log(team2Obj[0].attributes.players,'team2')

			var selectedTeams = []
			if(team1.checked === true){
				selectedTeams.push(team1Id)
			}
			if(team2.checked === true){
				selectedTeams.push(team2Id)
			}

			var team1Players = []
			var team2Players = []
			var teamPlayers = []

			for(var i = 0; i < team1Obj[0].attributes.players.length; i++){
				team1Players.push(team1Obj[0].attributes.players[i]._id)
				teamPlayers.push(team1Obj[0].attributes.players[i]._id)
			}

			for(var i = 0; i < team2Obj[0].attributes.players.length; i++){
				team2Players.push(team2Obj[0].attributes.players[i]._id)
				teamPlayers.push(team2Obj[0].attributes.players[i]._id)
			}

			// var selectedTeams = []
			// var teamPlayers = evt.target.teamPlayer
			// var assignedTeams = evt.target.team
			// var team1Name = evt.target.team1.value
			// var team2Name = evt.target.team2.value
			// console.log(team1Name, team2Name)
			// var team1Players = []
			// var team2Players = []

			// for(var i = 0; i < teamPlayers.length; i++){

			// 	if(teamPlayers[i].checked === true){
			// 		console.log(teamPlayers[i])
			// 		selectedTeams.push(teamPlayers[i].value)
			// 		if(assignedTeams[i].value === 'team1'){
			// 			team1Players.push(teamPlayers[i].value)
			// 		}
			// 		if(assignedTeams[i].value === 'team2'){
			// 			team2Players.push(teamPlayers[i].value)
			// 		}
			// 	}
			// }

			ACTIONS.create_match('team', teamPlayers, evt.target.matchName.value, team1Players, team2Players)

		}

	},

	render: function(){

		return(

			<div className = 'create-match-wrapper'>
				
				<form onKeyDown={ (event)=>{if (event.keyCode == 13) { return false} }} name="createMatch" className = 'create-match-form' onSubmit={this._handleSubmit}>

					<input type='text' name='matchName' placeholder='define match name'/>

					<select name="gameType" onChange={this._setGameType} >

					    <option value="dual">dual</option>
					    <option value="ffa">free for all</option>
					    <option value="team">team</option>
			
  					</select>

  					<PlayerChoiceComponent arenaTeams={this.props.arenaTeams} gameType={STORE.data.match_create_type} players={this.props.arena.attributes.players}/>

  					<button type='submit'>create match</button>

				</form>

			
			</div>

		)

	}

})

export default CreateMatchComponent