import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import PlayersOfTeamComponent from './components/teamPageComponents/playersOfTeamSelect.js'
import CreateArenaComponent from './components/allArenasPageComponents/arenaCreateComponent.js'
import TeamsComponent from './components/teamPageComponents/teamsComponent.js'

const ArenasPage = React.createClass({

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
 		//<ArenasComponent arenaTeams={this.state.arena_collection.models} arena={this.state.current_arena[0]} />
 		console.log(this.state)
 		if(true === true){
 		
			return (

		 		<div className='arenas-page-wrapper'>
		 			
		 			<Navbar />

		 			<div className='arena-create-wrapper'>
		 				
		 				<CreateArenaComponent />

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

export default ArenasPage