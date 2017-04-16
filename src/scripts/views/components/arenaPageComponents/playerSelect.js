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

	_renderSelectedPlayers: function(players){

		var playersArray = []

		if(players != undefined){

			for(var i = 0; i < players.length; i++){
				var player = players[i]
				playersArray.push(<SelectedPlayersComponent player={player} />)

			}
			console.log(playersArray)
			return playersArray

		}

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

	_handleKeyPress: function(evt){

		var txt = evt.target.value
	
		var filteredPlayers = this.props.players.filter(function(player) {
    		
    		if(player != undefined && txt.length > 0){
    			console.log(player)
    			console.log(player.name)
    			console.log(txt)
    			return player.name.includes(txt)
    		}
  		
  		})

  		var playersElements = []

  		for(var i = 0; i < filteredPlayers.length; i++){

  			playersElements.push(<PlayerSuggestionsComponent player = {filteredPlayers[i]}  />)

  		}

  		STORE._set({suggested_players: playersElements })


	},

	render: function(){

		var suggestions = STORE.data.suggested_players ? STORE.data.suggested_players : ''


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

					<div>{suggestions}</div>
					
					<input onKeyUp = {this._handleKeyPress} name = "addPlayer" placeholder = "username of player" />

					<div multiple size={STORE.data.selected_players_team != undefined ? STORE.data.selected_players_team.length : 3} name="freeForAll">{this._renderSelectedPlayers(STORE.data.selected_players_team)}</div>
					

					

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

const PlayerSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		console.log(this.props.player.name)
		var id = this.props.player._id
		if(STORE.data.selected_players_team){

			if(STORE.data.selected_players_team.includes(this.props.player)){

			}

			else{

				var arrayOfPlayers = STORE.data.selected_players_team
				arrayOfPlayers.push(this.props.player)
				STORE._set({selected_players_team: arrayOfPlayers})
				console.log(STORE.data.selected_players_team)

			}

		}

		else{

			STORE._set({selected_players_team: [this.props.player]})

		}

	},

	render: function(){
		//<label><input onClick={this._handleClick} type="checkbox" name="freeForAll" value={this.props.player._id} />{this.props.player.name}</label>
		//<button onClick={this._handleClick(this.props.player._id)}>{this.props.player.name}</button>
		//<option value={this.props.player.email}>{this.props.player.name}</option>
		return(
			
			<button type="button" onClick={this._handleClick}>{this.props.player.name}</button>

		)

	}

})


var SelectedPlayersComponent = React.createClass({

	_handleClick: function(id){

		//remove player from store array.

	},

	render: function(){
		//<option value={this.props.player.email}>{this.props.player.name}</option>
		return(
			
			<label name="freeForAll">
			{this.props.player.name}
			<input type="checkbox" name="freeForAll" value={this.props.player._id} />
			</label>

		)

	}

})

export default PlayerChoiceComponent