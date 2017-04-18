import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const ArenaComponent = React.createClass({

	_addPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	_renderSelectedPlayers: function(players){

		var playersArray = []

		if(players != undefined){
				
			var numberOfPlayers = players.length

			for(var i = 0; i < numberOfPlayers; i++){

				var player = players[i]

				if(player != undefined){

					playersArray.push(<PlayersComponent player={player} />)

				}
				
			}
		
			return playersArray

		}

	},

	_renderAutoComplete: function(players){
	
		var playersElements = []

		if(players != undefined && STORE.data.last_selected_input != undefined){

			if(STORE.data.last_selected_input.name === this.props.arena._id){

				for(var i = 0; i < players.length; i++){
					
					console.log('yes')
					playersElements.push(<ArenaPlayerSuggestionsComponent player = {players[i].attributes}  />)

				}

				return playersElements

			}


		}
		

	},

	_handleKeyPress: function(evt){

		evt.preventDefault()

		var txt = evt.target.value

  		ACTIONS.query_user_by_name(txt)

	},

	_handleClick: function(evt){
		evt.preventDefault()
		STORE._set({last_selected_input: evt.target})

	},

	render: function(){

		if(this.props.arena != undefined){

			var suggestions = ""

			if(STORE.data.auto_complete_users){
				var suggestions = STORE.data.auto_complete_users.models
				console.log(suggestions)
			}

			var theArena = ""

			if(this.props.arena){

				var theArena = this.props.arena
				var arenaName = theArena.name
				var arenaPlayers = theArena.players
				var arenaId = theArena._id

			}
			
			console.log(suggestions)
		
			return(

				<div name='player-select-wrapper'>

					<h3>{arenaName}</h3>

					<div>{this._renderAutoComplete(suggestions)	}</div>
					
					<input onClick = {this._handleClick} onKeyUp = {this._handleKeyPress} name = {arenaId} placeholder = "username of player" />

					<div>{this._renderSelectedPlayers(arenaPlayers)}</div>
					
				</div>

			)

		}
	
		else{
			return null
		}

	}

})

const ArenaPlayerSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		var id = this.props.player._id

		if(STORE.data.arena_builder_selected_players){
			
			if(STORE.data.arena_builder_selected_players.includes(this.props.player)){

				console.log('player already in selected')

			}

			else{

				var arrayOfPlayers = STORE.data.arena_builder_selected_players
				arrayOfPlayers.push(this.props.player)
				STORE._set({arena_builder_selected_players: arrayOfPlayers})
				console.log(STORE.data.arena_builder_selected_players)

			}

		}

		else{

			STORE._set({arena_builder_selected_players: [this.props.player]})

		}

	},

	render: function(){
		console.log(this.props.player.name)
		return(
			
			<button type="button" onClick={this._handleClick}>{this.props.player.name}</button>

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

export default ArenaComponent