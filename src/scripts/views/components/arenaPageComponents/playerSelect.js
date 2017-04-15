import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const PlayerChoiceComponent = React.createClass({


	_ffaPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<FfaPlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	_teamPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<TeamPlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	_dualPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<DualPlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	render: function(){

		if(this.props.gameType === 'dual'){

			return(

				<div name='player-select-wrapper'>

					<div>
					<h4 id="dual-player-title">player 1</h4>
						<select name='player1'>
							{this._dualPlayers(this.props.players)}
						</select>
					</div>

					<div>
					<h4 id="dual-player-title">player 2</h4>
						<select name='player2'>
							{this._dualPlayers(this.props.players)}
						</select>
					</div>

				</div>

			)

		}

		if(this.props.gameType === 'team'){

			return(

				<div name='player-select-wrapper'>
					<input type='text' name='team1Name' placeholder='team1 name'/>

					<input type='text' name='team2Name' placeholder='team2 name'/>
					{this._teamPlayers(this.props.players)}

				</div>

			)

		}

		if(this.props.gameType === 'ffa'){

			return(

				<div name='player-select-wrapper'>

					{this._ffaPlayers(this.props.players)}

				</div>

			)

		}
		
	}

})

const DualPlayersComponent = React.createClass({

	render: function(){
		//<option value={this.props.player.email}>{this.props.player.name}</option>
		return(
			<option name="dual" value={this.props.player._id}>{this.props.player.name}</option>
			//<label><input type="checkbox" name=	{this.props.player.email} value={this.props.player.email} />{this.props.player.name}</label>	

		)

	}

})

const TeamPlayersComponent = React.createClass({

	render: function(){
		//<option value={this.props.player.email}>{this.props.player.name}</option>
		return(
			
			<label name='teams'>
				<input type="checkbox" name='teamPlayer' value={this.props.player._id} />{this.props.player.name}
				<select name="teamSelect">	
					<option value="team1">team1</option>
					<option value="team2">team2</option>
				</select>
			</label>

		)

	}

})

const FfaPlayersComponent = React.createClass({

	render: function(){
		//<option value={this.props.player.email}>{this.props.player.name}</option>
		return(
			
			<label><input type="checkbox" name="freeForAll" value={this.props.player._id} />{this.props.player.name}</label>	

		)

	}

})

export default PlayerChoiceComponent