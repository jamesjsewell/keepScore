import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import LeaderboardComponent from './components/leaderboardPageComponents/LeaderboardComponent.js'


const LeaderboardPage = React.createClass({

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

 		if(this.state.current_arena != undefined && this.state.leaderboard_stats != undefined){
 			
			return (

		 		<div className='leaderboard-page-wrapper'>
		 			
		 			<Navbar />

		 			<div className='leaderboard-wrapper'>
		 				
		 				<LeaderboardComponent arena={this.state.current_arena[0]} players={this.state.current_arena[0].attributes.players}/>

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

export default LeaderboardPage