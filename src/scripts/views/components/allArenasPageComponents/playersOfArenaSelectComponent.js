import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const PlayersOfArenaSelectComponent = React.createClass({

	_addPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	_handleClick: function(evt){

		evt.preventDefault()
		STORE._set({last_selected_input: evt.target})

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

		if(STORE.data.last_selected_input != undefined){

			if(STORE.data.last_selected_input.name === 'addPlayer'){

				if(players != undefined){
					console.log(players)
					for(var i = 0; i < players.length; i++){
						console.log('yes')
						playersElements.push(<ArenaPlayerSuggestionsComponent player = {players[i].attributes}  />)

					}

					return playersElements


				}

			}

		}
		

	},

	_handleKeyPress: function(evt){

		evt.preventDefault()

		var txt = evt.target.value

  		ACTIONS.query_user_by_name(txt)

	},

	render: function(){

		var suggestions = ""

		if(STORE.data.auto_complete_users){
			var suggestions = STORE.data.auto_complete_users.models
			console.log(suggestions)
		}

		var arenaPlayers = ""

		if(STORE.data.arena_create_selected_players != undefined){

			if(STORE.data.arena_create_selected_players['create_arena'] != undefined){
				arenaPlayers = STORE.data.arena_create_selected_players['create_arena']
			}

		}
		
		console.log(suggestions)
		
		return(

				<div name='player-select-wrapper'>

					<div>{this._renderAutoComplete(suggestions)	}</div>
					
					<input onClick={this._handleClick} onKeyUp = {this._handleKeyPress} name = "addPlayer" placeholder = "username of player" />

					<div>{this._renderSelectedPlayers(arenaPlayers)}</div>
					
				</div>

			)
	
	}

})

const ArenaPlayerSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		var id = this.props.player._id

		if(STORE.data.arena_create_selected_players != undefined){

			if(STORE.data.arena_create_selected_players['create_arena'] != undefined){
			
				if(STORE.data.arena_create_selected_players['create_arena'].includes(this.props.player)){

					console.log('player already in selected')

				}

				else{

					var arrayOfPlayers = STORE.data.arena_create_selected_players['create_arena']
					arrayOfPlayers.push(this.props.player)
					var arrayOfPlayersObj = {}
					arrayOfPlayersObj['create_arena'] = arrayOfPlayers
					STORE._set({arena_create_selected_players: arrayOfPlayersObj})

				}
			}
		}

		else{

			STORE._set({arena_create_selected_players: {'create_arena': [this.props.player]}})

		}

	},

	render: function(){
		
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

export default PlayersOfArenaSelectComponent