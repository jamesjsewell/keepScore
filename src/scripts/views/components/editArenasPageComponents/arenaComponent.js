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

	_renderSelectedPlayers: function(players, selectionType, editable){

		var playersArray = []

		if(players != undefined && editable === true){
				
			var numberOfPlayers = players.length

			for(var i = 0; i < numberOfPlayers; i++){

				var player = players[i]

				if(selectionType === 'newPlayers' && player != undefined && this.props.arena.players.includes(player) === false){

					playersArray.push(<PlayersComponent player={player} />)

				}
				else{
					if(player != undefined){
						playersArray.push(<PlayersComponent player={player} />)
					}
				}
				
			}
			
			return playersArray

		}

	},

	_renderAutoComplete: function(players, editable){
	
		var playersElements = []

		if(players != undefined && STORE.data.last_selected_input != undefined && editable === true){

			if(STORE.data.last_selected_input.name === this.props.arena._id){

				for(var i = 0; i < players.length; i++){
					
					console.log('yes')
					playersElements.push(<ArenaPlayerSuggestionsComponent arena = {this.props.arena} player = {players[i].attributes} arenaId = {this.props.arena._id}/>)

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

	_handleUpdateArena: function(evt){

		evt.preventDefault()
		if(STORE.data.edit_arena === this.props.arena._id){

			var players = evt.target.players

			var nameTarget = evt.target.name

			var name = nameTarget.value

			var playerInputsArray = []

			for(var i = 0; i < players.length; i++){

				if(players[i].checked === true){

					playerInputsArray.push(players[i].value)

				}

			}

			ACTIONS.update_arena(playerInputsArray, name, this.props.arena._id)	
			STORE.data.arena_builder_selected_players = {}
		}


	},

	render: function(){

		if(this.props.arena != undefined){

			var suggestions = ""

			if(STORE.data.auto_complete_users){
				var suggestions = STORE.data.auto_complete_users.models
				console.log(suggestions)
			}

			var theArena = ""
			var newSelectedPlayers = ""

			if(this.props.arena){

				var theArena = this.props.arena
				var arenaName = theArena.name
				var arenaPlayers = theArena.players
				console.log(arenaPlayers)
				var arenaId = theArena._id

				if(STORE.data.arena_builder_selected_players != undefined){
					var newSelectedPlayers = STORE.data.arena_builder_selected_players[this.props.arena._id]
				}

				var editable = false

				if(STORE.data.edit_arena){
					if(STORE.data.edit_arena === arenaId){
						editable = true
					}
					
				}

			}
		
			return(

				<div className='create-match-wrapper'>

					<button onClick={ () => {STORE._set({"edit_arena": arenaId })} } className="btn" type="button">edit arena</button>

					<form onSubmit={this._handleUpdateArena}>
						
						<h3>{arenaName}</h3>

						<h4>rename {arenaName}</h4>

						<input name = "name" placeholder = "rename arena" />

						<div>{this._renderAutoComplete(suggestions, editable)}</div>
					
						<input onClick = {this._handleClick} onKeyUp = {this._handleKeyPress} name = {arenaId} placeholder = "username of player" />

						<div>{this._renderSelectedPlayers(arenaPlayers, '', editable)}</div>

						<div>{this._renderSelectedPlayers(newSelectedPlayers,'newPlayers', editable)}</div>

						<button type="submit">update arena</button>

					</form>
					
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

		console.log(this.props.arena.players, this.props.player)

		var allPlayers = this.props.arena.players
		var thePlayer = this.props.player
		var filtered = allPlayers.filter(function(player){if(player._id === thePlayer._id){return true}})

		var alreadyIn = false

		if(filtered.length > 0){

			alreadyIn = true
		}
	
		if(STORE.data.arena_builder_selected_players != undefined){

			if(STORE.data.arena_builder_selected_players[this.props.arenaId] != undefined){
				
				if(STORE.data.arena_builder_selected_players[this.props.arenaId].includes(this.props.player) || alreadyIn === true){
					
					console.log('player already in selected')



				}

				else{

					var arrayOfPlayers = STORE.data.arena_builder_selected_players[this.props.arenaId]
					arrayOfPlayers.push(this.props.player)

					arrayOfPlayersObj = {}
					arrayOfPlayersObj[this.props.arenaId] = arrayOfPlayers
					STORE._set({arena_builder_selected_players: arrayOfPlayersObj})

				}


			}

			else{

				if(alreadyIn === false){

					console.log('adding this arena to the selected players')
					var arrayOfPlayersObj = {}
					arrayOfPlayersObj[this.props.arenaId] = [this.props.player]
					STORE._set({arena_builder_selected_players: arrayOfPlayersObj})

				}
				else{
					console.log('already contains user')
				}

			}


		}

		else{

			if(alreadyIn === false){

				console.log('adding this arena to the selected players')
				var arrayOfPlayersObj = {}
				arrayOfPlayersObj[this.props.arenaId] = [this.props.player]
				STORE._set({arena_builder_selected_players: arrayOfPlayersObj})

			}
			else{
				console.log('already contains user')
			}

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

			<div className="chip avatar">
			<img src={this.props.player.avatar_url} />
			<input id={this.props.player._id} type="checkbox" name="players" value={this.props.player._id} />
			<label htmlFor={this.props.player._id} > {this.props.player.name} </label>	
			</div>	

		)

	}

})

export default ArenaComponent