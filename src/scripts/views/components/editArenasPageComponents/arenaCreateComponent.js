import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
//imported components
//import PlayersOfArenaComponent from './playersOfTeamSelect.js'
import PlayersOfArenaSelectComponent from './playersOfArenaSelectComponent.js'


const CreateArenaComponent = React.createClass({


	_handleSubmit: function(evt){

		evt.preventDefault()

		var playerInputsArray = []

		var players = evt.target.players

		for(var i = 0; i < players.length; i++){

			if(players[i].checked === true){

				playerInputsArray.push(players[i].value)

			}

		}

		ACTIONS.create_arena(playerInputsArray, evt.target.arenaName.value)		

	},

	render: function(){
		
		return(

			<div className = 'create-arena-wrapper'>
				
				<form className = 'create-arena-form' onSubmit={this._handleSubmit}>

					<input type='text' name='arenaName' placeholder='define arena name'/>

  					<PlayersOfArenaSelectComponent />

  					<button type='submit'>create arena</button>

				</form>

			</div>

		)

	}

})

export default CreateArenaComponent