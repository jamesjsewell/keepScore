import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const ActiveMatchComponent = React.createClass({

	_makePlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayerComponent player={players[i]} />)

		}

		return playersArray
		

	},

	render: function(){

		<div className = 'active-match-wrapper'>
			{this._makePlayers(this.props.players)}
		</div>	

	}

})


const PlayerComponent = React.createClass({

	render: function(){

		<div>

			<h4>{this.props.player.name}</h4>
			<input>  </input>

		</div>

	}

})

export default ActiveMatchComponent