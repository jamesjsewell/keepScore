import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
//imported components
import PlayersOfTeamComponent from './playersOfTeamSelect.js'


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

			<div className="col s6 container center-align m6 offset-m3 green accent-4">

				<div className = 'card green accent-3'>
				
					<form className = 'card-content container center-align white-text' onSubmit={this._handleSubmit}>

						<div className="card-content input-field container">
							<input type='text' name='teamName' placeholder='define team name'/>
						</div>

	  					<PlayersOfTeamComponent players={this.props.arena.attributes.players} />

	  					<button className='btn green accent-1 green-text flow-text' type='submit'>create team</button>

					</form>

				</div>

			</div>

		)

	}

})

export default CreateTeamComponent