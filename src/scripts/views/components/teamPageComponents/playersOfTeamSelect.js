import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const PlayersOfTeamComponent = React.createClass({

	_addPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	render: function(){
		
		return(

				<div name='player-select-wrapper'>

					<div>{suggestions}</div>
					
					<input onKeyUp = {this._handleKeyPress} name = "addPlayer" placeholder = "username of player" />

					<div>{this._renderSelectedPlayers(STORE.data.selected_players_team)}</div>
					
				</div>

			)

	
	}

})


const PlayersComponent = React.createClass({

	render: function(){
	
		return(
			
			<label><input type="checkbox" name="players" value={this.props.player._id} />{this.props.player.name}</label>	

		)

	}

})

export default PlayersOfTeamComponent