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

	_renderSelectedTeams: function(teams){

		var teamsArray = []

		if(teams != undefined){

			var numberOfTeams = 2

			for(var i = 0; i < numberOfTeams; i++){

				var team = teams[i]

				if(team != undefined){

					teamsArray.push(<SelectedTeamsComponent team={team} />)

				}
				
			}
		
			return teamsArray

		}

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

		if(STORE.data.match_create_type === 'team'){

			var inputName = evt.target.name
		
			if(inputName === 'team1'){
				var whatTeam = 'team1'
			}

			if(inputName === 'team2'){
				var whatTeam = 'team2'
			}

			var filteredTeams = this.props.arenaTeams.filter(function(team) {
    		
    		if(team != undefined && txt.length > 0){
    			console.log(team)
    			console.log(team.attributes.name)
    			console.log(txt)
    			return team.attributes.name.includes(txt)
    		}
  		
	  		})

	  		var teamsElements = []

	  		for(var i = 0; i < filteredTeams.length; i++){

	  			teamsElements.push(<TeamSuggestionsComponent whatTeam = {whatTeam} team = {filteredTeams[i]}  />)

	  		}

	  		STORE._set({match_suggested_teams: teamsElements })


		}
	
	},

	render: function(){

		var suggestions = STORE.data.suggested_players ? STORE.data.suggested_players : ''

		if(this.props.gameType === 'dual'){

			return(

				<div className="col s6 container center-align m6 offset-m3 green accent-4">

					<div className = 'card green accent-3'>

						<div className='card-content container' name='player-select-wrapper'>

							<div>{suggestions}</div>
							
							<div className="input-field card-content white">
								<input className="" onKeyUp = {this._handleKeyPress} name = "addPlayer1" placeholder = "player1" />
							</div>

							<div className="input-field card-content white">
								<input className="" onKeyUp = {this._handleKeyPress} name = "addPlayer2" placeholder = "player2" />
							</div>
							<h6 className="white-text center-align">selected players</h6>
							<div className="card-content" multiple size="2" >{this._renderSelectedPlayers(STORE.data.selected_players_match)}</div>

						</div>

					</div>

				</div>

			)

		}

		if(this.props.gameType === 'team'){

			var suggestions = STORE.data.match_suggested_teams

			return(

			<div className="col s6 container center-align m6 offset-m3 green accent-4">

					<div className = 'card green accent-3'>

						<div name='card-content container center-align'>

							<div>{suggestions}</div>

							<div className="input-field card-content white">
								<input onKeyUp = {this._handleKeyPress} name = "team1" placeholder = "team 1" />
							</div>

							<div className="input-field card-content white">
								<input onKeyUp = {this._handleKeyPress} name = "team2" placeholder = "team 2" />
							</div>

							<h5 className="white-text center-align"> select teams </h5>

							<div>{this._renderSelectedTeams(STORE.data.match_selected_teams)}</div>

						</div>

					</div>

				</div>

			)

		}

		if(this.props.gameType === 'ffa'){

			return(

				<div className="col s6 container center-align m6 offset-m3 green accent-4">

					<div className = 'card green accent-3'>

						<div name='card-content container center-align green accent-3'>


							<div className="green accent-3">{suggestions}</div>

							<div className="input-field card-content white">
								<input onKeyUp = {this._handleKeyPress} name = "addPlayer" placeholder = "username of player" />
							</div>

							<div className="card-content">
								<div multiple size={STORE.data.selected_players_match != undefined ? STORE.data.selected_players_match.length : 3} name="freeForAll">{this._renderSelectedPlayers(STORE.data.selected_players_match)}</div>	
							</div>

						</div>

					</div>

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

const TeamSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		console.log(this.props.team.attributes.name)
		var id = this.props.team.attributes._id

		if(STORE.data.match_selected_teams){

			if(this.props.whatTeam === 'team1'){
				
				var arrayOfTeams = STORE.data.match_selected_teams
				arrayOfTeams[0] = this.props.team
				STORE._set({match_selected_teams: arrayOfTeams})

			}

			if(this.props.whatTeam === 'team2'){

				var arrayOfTeams = STORE.data.match_selected_teams
				arrayOfTeams[1] = this.props.team
				STORE._set({match_selected_teams: arrayOfTeams})

			}
			
		}

		else{

			STORE._set({match_selected_teams: [this.props.team]})

		}

	},

	render: function(){

		return(
			
			<button type="button" onClick={this._handleClick}>{this.props.team.attributes.name}</button>

		)

	}

})

var SelectedTeamsComponent = React.createClass({

	_handleClick: function(id){

		//remove player from store array.

	},

	_makePlayers: function(player){

		if(player != undefined){

			return(

			
				<div className="chip avatar">
					<img src={player.avatar_url} />
					<a className="green-text" type="button" name="players" value={player._id} > {player.name} </a>	
				</div>
			

		)

		}
		else{
			return null
		}
		

	},

	render: function(){
		
		if(this.props.team.attributes._id != undefined){

			return(
			
				<div className="container card-content white-text" name="team">
			
				
				<input id={this.props.team.attributes._id} type="checkbox" name="team" value={this.props.team.attributes._id} />
				<label className = "white-text" htmlFor={this.props.team.attributes._id} > {this.props.team.attributes.name} </label>	
				<p>{this.props.team.attributes.players.map(this._makePlayers)}</p>

				</div>

			)



		}
		else {
			return null
		}
		

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

			<a className="chip avatar" onClick={this._handleClick}>
			<img src={this.props.player.avatar_url} />
			<p className="green-text" type="button" name="players" value={this.props.player._id} > {this.props.player.name} </p>	
			</a>	
	
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
			
			<div className="chip avatar" onClick={this._handleClick}>
			<img src={this.props.player.avatar_url} />
			<input id={this.props.player._id} type="checkbox" name="players" value={this.props.player._id} />
			<label name="players" className = "green-text" htmlFor={this.props.player._id} > {this.props.player.name} </label>	
			</div>

		)

	}

})

export default PlayerChoiceComponent