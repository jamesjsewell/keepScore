import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import _ from 'underscore'

const JoinArenaComponent = React.createClass({

	_addPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayersComponent player={players[i]} />)

		}

		return(

			playersArray

		)

	},

	_renderSelectedPlayers: function(players, selectionType){

		var playersArray = []

		if(players != undefined){
				
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

	_renderAutoComplete: function(players){
	
		var playersElements = []

		if(players != undefined && STORE.data.last_selected_input != undefined){

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

	},

	_handleJoinArena: function(evt){
		
		evt.preventDefault()
		
		
		
		if(this.props.arena != undefined){
			var isMember = STORE.data.arenaMembers[this.props.arena._id]
			var arenaId = this.props.arena._id
			console.log(isMember)
			if(isMember === false){
				console.log('joining arena')
				ACTIONS.join_arena(arenaId, this.props.arena)

			}

		}
	
	},

	render: function(){

		var alreadyMember = false
		

		if(this.props.arena != undefined){

			STORE.data.arenaMembers[this.props.arena._id] = false 

			if(this.props.arena.players != undefined){

				if(STORE.data.logged_in_user != undefined){

					var isMember = _.filter(this.props.arena.players, function(player){ if(player._id === STORE.data.userId){ return true}})
					console.log(isMember)

					if(isMember[0] != undefined){
						if(isMember[0].name){
							var alreadyMember = true
							STORE.data.arenaMembers[this.props.arena._id] = alreadyMember
						}	
					}

				}
			}

			var suggestions = ""

			if(STORE.data.auto_complete_arenas){
				var suggestions = STORE.data.auto_complete_arenas.models
				console.log(suggestions)
			}

			var theArena = ""
			var newSelectedPlayers = ""
			var currentArenaId = ""

			if(this.props.arena != undefined){

				var theArena = this.props.arena
				var arenaName = theArena.name
				var arenaPlayers = theArena.players
				var arenaId = theArena._id

				if(STORE.data.current_arena != 'no current arena'){
					var currentArenaId = STORE.data.current_arena[0].attributes._id
				}
				

			}
			
			if(alreadyMember === false){

				return(

				<div className="card-panel green accent-3 col s6 center-align">
					
					<div className="card-content">
						<h5 className='white-text center-align'>Arena: {arenaName ? arenaName : 'unnamed arena'}</h5>

						<div className='card-panel center-align col s8 green accent-4'>{this._renderSelectedPlayers(arenaPlayers, '')}</div>
					</div>

					<a className="card-content waves-effect waves-light green accent-1 green-text btn" onClick={this._handleJoinArena} > {alreadyMember ? 'member of arena' : 'join arena'} </a>

				</div>

				)

			}
			else{
				return(

				<div className="card-panel green accent-3 col s6 center-align">
					<h5 className='white-text center-align'>you are a member of {arenaName ? arenaName : 'unnamed arena'}</h5>
				</div>

				)
			}
			

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
			
			<a className="waves-effect waves-light btn" type="button" onClick={this._handleClick}>{this.props.player.name}</a>

		)

	}

})


const PlayersComponent = React.createClass({

	render: function(){
	
		return(
			
			<label className="chip green accent-2">
			<img className="circle" src={this.props.player.avatar_url} />
			{this.props.player.name}
			</label>	

		)

	}

})

export default JoinArenaComponent