import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import PlayerChoiceComponent from './components/arenaPageComponents/playerSelect.js'
import QueueComponent from './components/arenaPageComponents/matchesQueue.js'
import RecentMatchesComponent from './components/arenaPageComponents/recentMatches.js'


STORE._set({match_create_type: 'dual'})

const ArenaPage = React.createClass({

	_handleLogout: function(){

		ACTIONS.logout()

	},

	componentWillMount: function(){

		ACTIONS.get_user()
		ACTIONS.get_queued_matches()
		ACTIONS.get_current_arena()
		ACTIONS.get_completed_matches()
		
		
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})

	},

	componentWillUnmount: function() {

		STORE.off('dataUpdated')

	},

	getInitialState: function() {

		return STORE.data

	},

	goToArenasPage: function(evt){

		evt.preventDefault()
		location.hash = 'arenas'

	},

	goToArenaBuilderPage: function(evt){

		evt.preventDefault()
		location.hash = 'arena_builder'

	},

 	render: function(){

 		if(User.getCurrentUser() != null){


 		}

 		if(this.state.current_arena != undefined && this.state.queued_match_collection != undefined && this.state.completed_match_collection != undefined){
 			
			return (

	 		<div className='arenas-page-wrapper'>
	 			
	 			<Navbar />
	 			<CreateMatchComponent arena={this.state.current_arena[0]} />
	 			<QueueComponent arena={this.state.current_arena[0]} queueMatches={this.state.queued_match_collection.models} />
	 			<RecentMatchesComponent arena={this.state.current_arena[0]} queueMatches={this.state.completed_match_collection.models} />

	 		</div>

			)

 		}

		else{

			return (

				<div className='arenas-page-wrapper'>
					
					<Navbar />
					<button onClick={this.goToArenasPage}>join an arena</button>
					<button onClick={this.goToArenaBuilderPage}>create an arena</button>

				</div>

			)

		}

 		return(

 			<div></div>

 		)	
 		
 	}

})

const CreateMatchComponent = React.createClass({

	_setGameType: function(evt){

		evt.preventDefault()
		STORE._set({match_create_type: evt.target.value})

	},

	_handleSubmit: function(evt){

		evt.preventDefault()

		if(STORE.data.match_create_type === 'ffa'){

			var playerInputsArray = []

			var ffaPlayers = evt.target.freeForAll

			for(var i = 0; i < ffaPlayers.length; i++){

				if(ffaPlayers[i].checked === true){

					playerInputsArray.push(ffaPlayers[i].value)

				}

			}

			ACTIONS.create_match('ffa', playerInputsArray, evt.target.matchName.value)

		}

		if(STORE.data.match_create_type === 'team'){

			var selectedPlayers = []
			var teamPlayers = evt.target.teamPlayer
			var assignedTeams = evt.target.teamSelect
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

		if(STORE.data.match_create_type === 'dual'){

			var playerInputsArray = []
			var dualPlayer1 = evt.target.player1
			var dualPlayer2 = evt.target.player2
			var dualPlayers = [dualPlayer1,dualPlayer2]

			playerInputsArray[0] = dualPlayer1.value
			playerInputsArray[1] = dualPlayer2.value
			

			ACTIONS.create_match('dual', playerInputsArray, evt.target.matchName.value)


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

export default ArenaPage