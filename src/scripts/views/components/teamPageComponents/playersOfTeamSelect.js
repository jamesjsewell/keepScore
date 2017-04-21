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

	_handleKeyPress: function(evt){

		evt.preventDefault()

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

  			playersElements.push(<TeamPlayerSuggestionsComponent player = {filteredPlayers[i]}  />)

  		}

  		STORE._set({team_edit_suggested_players: playersElements })

	},

	render: function(){

		var suggestions = STORE.data.team_edit_suggested_players
		
		return(

				<div name='player-select-wrapper'>

					<div>{suggestions}</div>
					
					<input onKeyUp = {this._handleKeyPress} name = "addPlayer" placeholder = "username of player" />

					<div>{this._renderSelectedPlayers(STORE.data.team_edit_selected_players)}</div>
					
				</div>

			)

	
	}

})

const TeamPlayerSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		var id = this.props.player._id

		if(STORE.data.team_edit_selected_players){
			
			if(STORE.data.team_edit_selected_players.includes(this.props.player)){

				console.log('player already in selected')

			}

			else{

				var arrayOfPlayers = STORE.data.team_edit_selected_players
				arrayOfPlayers.push(this.props.player)
				STORE._set({team_edit_selected_players: arrayOfPlayers})
				console.log(STORE.data.team_edit_selected_players)

			}

		}

		else{

			STORE._set({team_edit_selected_players: [this.props.player]})

		}

	},

	render: function(){

		return(
			
			<button className="chip avatar btn green accent-1 green-text flow-text s6" onClick={this._handleClick} type="button" name="players" value={this.props.player._id} >
			<img src={this.props.player.avatar_url} />
		 	{this.props.player.name} 
			</button>	

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

export default PlayersOfTeamComponent