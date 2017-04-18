import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import PlayersOfTeamComponent from './components/teamPageComponents/playersOfTeamSelect.js'
import CreateArenaComponent from './components/allArenasPageComponents/arenaCreateComponent.js'
import TeamsComponent from './components/teamPageComponents/teamsComponent.js'
import ArenaComponent from './components/allArenasPageComponents/arenaComponent.js'

const ArenasPage = React.createClass({

	componentWillMount: function(){

		ACTIONS.refresh_needed_data()

		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})

	},

	getInitialState: function() {

		return STORE.data

	},

	_renderArenas: function(arenas){

		if(arenas != null){

			var arenasArray = [] 

			for(var i = 0; i < arenas.length; i++){

				arenasArray.push(<ArenaComponent arena={arenas[i].attributes} />)

			}

			return arenasArray
		}
		

	},

 	render: function(){

 		if(STORE.data.my_created_arenas != undefined){

 			var myArenas = STORE.data.my_created_arenas
			
			return (

		 		<div className='arenas-page-wrapper'>
		 			
		 			<Navbar />

		 			<div className='arena-create-wrapper'>
		 				
		 				<CreateArenaComponent />

		 			</div>

		 			<div className='my-arenas-wrapper'>
		 				{this._renderArenas(myArenas)}
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