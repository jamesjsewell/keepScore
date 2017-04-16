import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const PlayerChoiceComponent = React.createClass({

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

			if(this.props.gameType	=== 'dual'){
				var numberOfPlayers = 2

				for(var i = 0; i < numberOfPlayers; i++){

					var player = players[i]

					if(player != undefined){

						playersArray.push(<SelectedPlayersComponent player={player} />)

					}
					
				}
			
				return playersArray
			}

			if(this.props.gameType === 'ffa'){
				
				numberOfPlayers = players.length

				for(var i = 0; i < numberOfPlayers; i++){

					var player = players[i]

					if(player != undefined){

						playersArray.push(<SelectedPlayersComponent player={player} />)

					}
					
				}
			
				return playersArray

			}

		}

	},

	_handleKeyPress: function(evt){

		var txt = evt.target.value

		if(STORE.data.match_create_type === 'ffa'){

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

		}

		if(STORE.data.match_create_type === 'dual'){

			var inputName = evt.target.name
		
			if(inputName === 'addPlayer1'){
				var dualPlayer = 'player1'
			}

			if(inputName === 'addPlayer2'){
				var dualPlayer = 'player2'
			}

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

	  			playersElements.push(<PlayerSuggestionsComponent dualPlayer = {dualPlayer} player = {filteredPlayers[i]}  />)

	  		}

	  		STORE._set({suggested_players: playersElements })


		}
	
	},

	render: function(){

		var suggestions = STORE.data.suggested_players ? STORE.data.suggested_players : ''

		if(this.props.gameType === 'dual'){

			return(

				<div name='player-select-wrapper'>

					<div>{suggestions}</div>
					
					<input onKeyUp = {this._handleKeyPress} name = "addPlayer1" placeholder = "player1" />

					<input onKeyUp = {this._handleKeyPress} name = "addPlayer2" placeholder = "player2" />

					<div multiple size="2" >{this._renderSelectedPlayers(STORE.data.selected_players_match)}</div>

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

					<div multiple size={STORE.data.selected_players_match != undefined ? STORE.data.selected_players_match.length : 3} name="freeForAll">{this._renderSelectedPlayers(STORE.data.selected_players_match)}</div>	

				</div>

			)

		}
		
	}

})

const TeamPlayersComponent = React.createClass({

	render: function(){
		
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


const PlayerSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		console.log(this.props.player.name)
		var id = this.props.player._id

		if(STORE.data.selected_players_match){

			if(STORE.data.match_create_type === 'dual'){

				if(this.props.dualPlayer === 'player1'){
					
					var arrayOfPlayers = STORE.data.selected_players_match
					arrayOfPlayers[0] = this.props.player
					STORE._set({selected_players_match: arrayOfPlayers})
					console.log(STORE.data.selected_players_match)

				}
				if(this.props.dualPlayer === 'player2'){

					var arrayOfPlayers = STORE.data.selected_players_match
					arrayOfPlayers[1] = this.props.player
					STORE._set({selected_players_match: arrayOfPlayers})
					console.log(STORE.data.selected_players_match)

				}

			}

			if(STORE.data.match_create_type === 'ffa'){


			
				if(STORE.data.selected_players_match.includes(this.props.player)){
					console.log('player already in selected')
				}

				else{

					var arrayOfPlayers = STORE.data.selected_players_match
					arrayOfPlayers.push(this.props.player)
					STORE._set({selected_players_match: arrayOfPlayers})
					console.log(STORE.data.selected_players_match)

				}

			}

		}

		else{

			STORE._set({selected_players_match: [this.props.player]})

		}

	},

	render: function(){

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

		if(STORE.data.match_create_type === 'dual'){

			var nameOfInput = "dual"

		}

		else{

			var nameOfInput = "freeForAll"

		}
	
		return(
			
			<label name="freeForAll">
			{this.props.player.name}
			<input type="checkbox" name={nameOfInput} value={this.props.player._id} />
			</label>

		)

	}

})

export default PlayerChoiceComponent