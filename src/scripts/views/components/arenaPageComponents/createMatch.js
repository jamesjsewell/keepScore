import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import _ from 'underscore'
import PlayerChoiceComponent from './playerSelect.js'
import $ from 'jquery'

const CreateMatchComponent = React.createClass({

	_handleChange: function(){
		return null
	},

	_setGameType: function(evt){

		console.log('changed game type')
		evt.preventDefault()
		STORE._set({match_create_type: evt.target.value})
		STORE._set({suggested_players: [] })
		STORE._set({selected_players_match: []})
		console.log(STORE.data.match_create_type)

		
	},

	_handleSubmit: function(evt){

		evt.preventDefault()

		if(STORE.data.match_create_type === 'ffa' || STORE.data.match_create_type === 'dual'){

			var playerInputsArray = []

			var players = evt.target.players
			console.log(players)
			console.log(evt.target.players)
			if(players != undefined){

				for(var i = 0; i < players.length; i++){

					if(players[i].checked === true){

						playerInputsArray.push(players[i].value)

					}

				}

				if(players.length > 2){

					ACTIONS.create_match(STORE.data.match_create_type, playerInputsArray, evt.target.matchName.value)

				}

			}
			

		}

		if(STORE.data.match_create_type === 'team' && evt.target.team[0] != undefined && evt.target.team[1] != undefined){
			
			var team1 = evt.target.team[0]
			var team2 = evt.target.team[1]
			var team1Id = team1.value
			var team2Id = team2.value
			console.log(team1)
			
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

				if(team1Obj != undefined && team2Obj != undefined){

				console.log(team1Obj[0].attributes.players,'team1')
				console.log(team2Obj[0].attributes.players,'team2')

				var team1Name = team1Obj[0].attributes.name
				var team2Name = team2Obj[0].attributes.name
				console.log(team1Name, team2Name)
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


				var sharedPlayers = team2Players.find(function(player){if(team1Players.includes(player)){return true}})
				
				if(sharedPlayers){
					alert('these teams share players') 
				}
				else{

					if(team1Players.length > 0 && team2Players.length > 0){

						ACTIONS.create_match('team', teamPlayers, evt.target.matchName.value, team1Players, team2Players, team1Name, team2Name)

					}
				}
			
			}	
			

		}

	},

	render: function(){

		return(
 			

 				<div className="col s6 container center-align m6 offset-m3 green accent-4">

					<div className = 'card green accent-3'>

						<h2 className="card-title card-content white-text flow-text">create match</h2>
						
						<form className = "card-content green accent-3 center-align" onKeyDown={ (event)=>{if (event.keyCode == 13) { return false} }} name="createMatch" className = 'create-match-form' onSubmit={this._handleSubmit}>

							<div className="center-align green accent-4">
								
								<h6 className="card-content white-text flow-text">select game-type</h6>

							    <button id="game-type" onClick={this._setGameType} className='btn-floating green accent-1 green-text flow-text s6' type="button"  value="dual" >{STORE.data.match_create_type === 'dual' ? 'dual': 'dual'} </button>
							 
							    <button id="game-type" onClick={this._setGameType} className='btn-floating green accent-1 green-text flow-text s6' type ="button"  value="ffa">{STORE.data.match_create_type === 'ffa' ? 'free': 'free'} </button>
							
							    <button id="game-type" onClick={this._setGameType} className='btn-floating green accent-1 green-text flow-text s6' type ="button" value="team" > {STORE.data.match_create_type === 'team' ? 'team': 'team'} </button>

								<h6 className="card-content white-text center-align">game-type set to {STORE.data.match_create_type}</h6>

						   	</div>


							<div className="input-field card-content container">

								<input className="flow-text" type='text' name='matchName' placeholder='define match name'/>
							
							</div>

		  					<PlayerChoiceComponent arenaTeams={this.props.arenaTeams} gameType={STORE.data.match_create_type} players={this.props.arena.attributes.players}/>

		  					<button className='btn green accent-1 green-text flow-text s6' type='submit'>create match</button>

						</form>
						
					</div>

				</div>

			

		)

	}

})

export default CreateMatchComponent