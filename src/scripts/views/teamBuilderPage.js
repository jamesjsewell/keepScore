import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import PlayersOfTeamComponent from './components/teamPageComponents/playersOfTeamSelect.js'
import CreateTeamComponent from './components/teamPageComponents/teamCreateComponent.js'
import TeamsComponent from './components/teamPageComponents/teamsComponent.js'

const TeamBuilderPage = React.createClass({

	componentWillMount: function(){

		ACTIONS.refresh_needed_data()
			
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

 	render: function(){

 		if(this.state.current_arena != undefined){
 			console.log(this.state.current_arena[0])
			return (

		 		<div className='arenas-page-wrapper'>
		 			
		 			<Navbar />

		 			<div className='team-create-wrapper'>
		 				
		 				<CreateTeamComponent arena={this.state.current_arena[0]} />
		 				<TeamsComponent arenaTeams={this.state.team_collection.models} arena={this.state.current_arena[0]} />

		 			</div>

		 		</div>

			)

 		}

		else{

			return (

				<div className='arenas-page-wrapper'>

				</div>

			)

		}

 		return(

 			<div></div>

 		)	
 		
 	}

})

export default TeamBuilderPage