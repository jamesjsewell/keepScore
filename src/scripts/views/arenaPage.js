import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navBar.js'
import PlayerChoiceComponent from './components/arenaPageComponents/playerSelect.js'
import QueueComponent from './components/arenaPageComponents/matchesQueue.js'
import RecentMatchesComponent from './components/arenaPageComponents/recentMatches.js'
import CreateMatchComponent from './components/arenaPageComponents/createMatch.js'


if(STORE.data.match_create_type){

}
else{
	STORE._set({match_create_type: 'dual'})
}

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
		location.hash = 'join_arenas'
		console.log('switching to page', location.hash)

	},

	goToArenaBuilderPage: function(evt){

		evt.preventDefault()
		location.hash = 'edit_arenas'
		console.log('switching to page', location.hash)
	},

 	render: function(){

 		if(User.getCurrentUser() != null){


 		}

 		if(this.state.current_arena != 'no current arena' && this.state.current_arena != undefined && this.state.queued_match_collection != undefined && this.state.completed_match_collection != undefined && this.state.team_collection.models != undefined){
 			
			return (

	 		<div className='blue-grey darken-4 page-container'>
	 			
	 			<Navbar />
	 			<h3 className="white-text center-align">{this.state.current_arena[0].attributes.name}</h3>
	 			<div className="row container center-align">

	 				<div className="col s12 center-align container">

	 					<button className='btn transparent white-text flow-text center-align' onClick={function(){location.hash="leaderboard"}} type='submit'>view leaderboard</button>
	 					<br />
	 					<button className='btn transparent white-text flow-text center-align' onClick={function(){location.hash="teams"}} type='submit'>create teams</button>
	 				</div>

	 			</div>
	 			
	 			<CreateMatchComponent arena={this.state.current_arena[0]} arenaTeams={this.state.team_collection.models}/>
	 			
	 			
	 			<QueueComponent arena={this.state.current_arena[0]} queueMatches={this.state.queued_match_collection.models} />
	 			

	 		</div>

			)

 		}

		else{

			return (

				<div className='green accent-4 center-align'>
					
					<Navbar />
					
					<button className='btn transparent white-text flow-text' onClick={this.goToArenasPage}>join an arena</button>
					<button className='btn transparent white-text flow-text' onClick={this.goToArenaBuilderPage}>create an arena</button>

				</div>

			)

		}

 		return(

 			<div className="blue-grey darken-4 page-container"></div>

 		)	
 		
 	}

})

export default ArenaPage