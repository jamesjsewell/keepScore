import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navBar.js'
import PlayersOfTeamComponent from './components/teamPageComponents/playersOfTeamSelect.js'
import CreateArenaComponent from './components/editArenasPageComponents/arenaCreateComponent.js'
import TeamsComponent from './components/teamPageComponents/teamsComponent.js'
import ArenaComponent from './components/editArenasPageComponents/arenaComponent.js'

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
				console.log(arenas[i].attributes)
				arenasArray.push(<ArenaComponent arena={arenas[i].attributes} />)

			}

			return arenasArray
		}
		

	},

 	render: function(){

 		if(STORE.data.my_created_arenas != undefined && STORE.data.current_arena != 'no current arena'){

 			var myArenas = STORE.data.my_created_arenas
			
			return (

		 		<div className='blue-grey darken-4 center-align page-container'>
		 			
		 			<Navbar />

		 			<h3 className="center-align white-text">create a new arena</h3>
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

				<div className='blue-grey darken-4'>
					<Navbar />

		 			<div className='arena-create-wrapper'>
		 				
		 				<CreateArenaComponent />

		 			</div>
				</div>

			)

		}

 		return(

 			<div></div>

 		)	
 		
 	}

})

export default ArenasPage