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

			<div className="col s6 container center-align m6 offset-m3 green accent-4">

				<div className = 'card green accent-3'>
				
					<form className = 'card content green accent-3' onSubmit={this._handleSubmit}>

						<div className="card-content input-field container">
							<input className="white" type='text' name='arenaName' placeholder='define arena name'/>
						</div>


	  					<PlayersOfArenaSelectComponent />

	  					<button className='btn green accent-1 green-text flow-text' type='submit'>create arena</button>

					</form>

				</div>

			</div>

		)

	}

})

export default CreateArenaComponent