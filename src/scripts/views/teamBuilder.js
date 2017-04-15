import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navbar.js'
import PlayersOfTeamComponent from './components/teamPageComponents/playersOfTeamSelect.js'

const TeamBuilderPage = React.createClass({

	componentWillMount: function(){

		ACTIONS.get_user()
			
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
		 			<div className='match-create-wrapper'>
		 				<CreateTeamComponent arena={this.state.current_arena[0]} />

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

const CreateTeamComponent = React.createClass({


	_handleSubmit: function(evt){

		evt.preventDefault()

		var playerInputsArray = []

		var players = evt.target.players

		for(var i = 0; i < players.length; i++){

			if(players[i].checked === true){

				playerInputsArray.push(players[i].value)

			}

		}

		ACTIONS.create_team(playerInputsArray, evt.target.teamName.value)		

	},

	render: function(){

		return(

			<div className = 'create-team-wrapper'>
				
				<form className = 'create-team-form' onSubmit={this._handleSubmit}>

					<input type='text' name='teamName' placeholder='define team name'/>

  					<PlayersOfTeamComponent players={this.props.arena.attributes.players} />

  					<button type='submit'>create team</button>

				</form>

			</div>

		)

	}

})

export default TeamBuilderPage