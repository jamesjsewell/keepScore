import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import PlayerChoiceComponent from './components/arenaPageComponents/playerSelect.js'
import QueueComponent from './components/arenaPageComponents/matchesQueue.js'
import RecentMatchesComponent from './components/arenaPageComponents/recentMatches.js'
import CreateMatchComponent from './components/arenaPageComponents/createMatch.js'


STORE._set({match_create_type: 'dual'})

const ArenaPage = React.createClass({

	_handleLogout: function(){

		ACTIONS.logout()

	},

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

export default ArenaPage