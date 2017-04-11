import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

const ArenaPage = React.createClass({

	_handleLogout: function(){

		ACTIONS.logout()

	},

	componentWillMount: function(){

		if(User.getCurrentUser() != null){

			ACTIONS.set_me_on_store()

		}

		ACTIONS.fetch_arenas()
		ACTIONS.fetch_matches()
		ACTIONS.set_store_selected_user(STORE.data.logged_in_user._id)
		
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})

	},

	componentWillUnmount: function() {

		STORE.off('dataUpdated')

	},

	getInitialState: function() {

		return STORE.data

	},

	goToArenasPage: function(evt){

		evt.preventDefault()
		location.hash = 'arenas'

	},

	goToArenaBuilderPage: function(evt){

		evt.preventDefault()
		location.hash = 'arena_builder'

	},

 	render: function(){

 		if(User.getCurrentUser() != null){

 			if(STORE.data.selected_user != undefined){

 				console.log(this.state.populated_user_current_arena)

 				if(STORE.data.selected_user.current_arena && this.state.populated_user_current_arena != undefined){

 					return (

				 		<div className='arenas-page-wrapper'>

				 			<button onClick = {this._handleLogout}>logout</button>
				 			<CreateMatchComponent arena={this.state.populated_user_current_arena} />
				 			<QueueComponent arena={this.state.populated_user_current_arena} queueMatches={this.state.selected_arena_matches} />

				 		</div>

 					)

 				}

 				else{

 					return (

	 					<div className='arenas-page-wrapper'>
	 						<button onClick = {this._handleLogout}>logout</button>
	 						<button onClick={this.goToArenasPage}>join an arena</button>
	 						<button onClick={this.goToArenaBuilderPage}>create an arena</button>

	 					</div>

 					)

 				}

 			}

 		}

 		else{

 			return (

		 		<div className='arenas-page-wrapper'>

		 			<h2>you are not logged in</h2>

		 		</div>

 			)
 		}

 		return(

 			<div></div>

 		)	
 		
 	}

})

const CreateMatchComponent = React.createClass({

	_setGameType: function(evt){

		evt.preventDefault()
		STORE._set({match_create_type: evt.target.value})

	},

	_handleSubmit: function(evt){

		evt.preventDefault()

		if(STORE.data.match_create_type === 'ffa'){

			var playerInputsArray = []

			var ffaPlayers = evt.target.freeForAll

			for(var i = 0; i < ffaPlayers.length; i++){

				if(ffaPlayers[i].checked === true){

					playerInputsArray.push(ffaPlayers[i].value)

				}

			}

			ACTIONS.create_match('ffa', playerInputsArray, evt.target.matchName.value)

			console.log(playerInputsArray)

		}

		if(STORE.data.match_create_type === 'team'){

			var selectedPlayers = []
			var teamPlayers = evt.target.teamPlayer
			var assignedTeams = evt.target.teamSelect
			var team1Players = []
			var team2Players = []

			for(var i = 0; i < teamPlayers.length; i++){

				//var playerEntry = {}
				//playerEntry['player'+i] = {name: players[i].value, team: team[i].value}
				//playerInputsArray.push({name: players[i].value, team: team[i].value})
				if(teamPlayers[i].checked === true){
					console.log(teamPlayers[i])
					selectedPlayers.push(teamPlayers[i].value)
					if(assignedTeams[i].value === 'team1'){
						team1Players.push(teamPlayers[i].value)
					}
					if(assignedTeams[i].value === 'team2'){
						team2Players.push(teamPlayers[i].value)
					}
				}
			}

			ACTIONS.create_match('team', selectedPlayers, evt.target.matchName.value, team1Players, team2Players)

			

		}

		if(STORE.data.match_create_type === 'dual'){

			var playerInputsArray = []
			var dualPlayer1 = evt.target.player1
			var dualPlayer2 = evt.target.player2
			var dualPlayers = [dualPlayer1,dualPlayer2]

			playerInputsArray[0] = dualPlayer1.value
			playerInputsArray[1] = dualPlayer2.value
			console.log(playerInputsArray)

			ACTIONS.create_match('dual', playerInputsArray, evt.target.matchName.value)

			console.log(playerInputsArray)

		}

	},

	render: function(){
	
		console.log(this.props.arena)

		return(

			<div className = 'create-match-wrapper'>
				
				<form className = 'create-match-form' onSubmit={this._handleSubmit}>

					<input type='text' name='matchName' placeholder='define match name'/>

					<select name="gameType" onChange={this._setGameType} >

					    <option value="dual">dual</option>
					    <option value="ffa">free for all</option>
					    <option value="team">team</option>
			
  					</select>

					<PlayerChoiceComponent gameType={STORE.data.match_create_type} players={this.props.arena.attributes.players}/>

  					<button type='submit'>create match</button>

				</form>

			</div>

		)

	}

})

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

			playersArray.push(<Player1Component player={players[i]} />)

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
					<h4>player 1</h4>
						<select name='player1'>
							{this._dualPlayers(this.props.players)}
						</select>
					</div>

					<div>
					<h4>player 2</h4>
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

const Player1Component = React.createClass({

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

const QueueComponent = React.createClass({

	_makeMatches: function(matches){
	
		var matchArray = []

		for(var i = 0; i < matches.length; i++){

			var match = matches[i].attributes

			if(match.players.length > 0){

				var players = match.players[0].email

			}

			else{

				var players = 'no players'

			}

			if(match.arena === STORE.data.selected_user.current_arena._id){
				matchArray.push(<MatchComponent match={matches[i].attributes} matchName={matches[i].attributes.name} matchPlayers={players} />)
			}

		}

		return(matchArray)

	},

	render: function(){

		if(this.props.queueMatches){

			return(

				<div className='queue-wrapper'>

					{this._makeMatches(this.props.queueMatches)}

				</div>

			)

		}

		else{

			return(<div><h3>retrieving matches</h3></div>)

		}
	}
})

const MatchComponent = React.createClass({

	delete_match: function(evtObj){

		evtObj.preventDefault()

	},

	render: function(){

		if(this.props.match.game_type === 'ffa'){
			var gameType = 'free-for-all'
		}

		if(this.props.match.game_type === 'team'){
			var gameType = 'team deathmatch'
		}

		if(this.props.match.game_type === 'dual'){
			var gameType = 'one vs one'
		}

		return(

			<div className = 'match-wrapper'>

				<h2>{this.props.matchName}</h2>
				<h3>{gameType}</h3>
				<PlayersOfMatchComponent match={this.props.match} players={this.props.match.players} />
				<button onClick={this.delete_match}>remove</button>

			</div>

		)
	}
})

const PlayersOfMatchComponent = React.createClass({
	
	_makePlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<PlayerComponent gameType={this.props.match.game_type} team1={this.props.match.team1} team2={this.props.match.team2} player={players[i]} />)
		}

		return playersArray

	},

	render: function(){

		var team = ''

		if(this.props.match.game_type === 'team'){
			var teamDisplay = true
			var nonTeamDisplay = false
		}
		else{
			var teamDisplay = false
			var nonTeamDisplay = true
		}

		console.log(this.props.match.players)

		return(

			<div className = 'players-of-match-wrapper'>

				<div className={teamDisplay ? 'hidden' : ''}>

					{this._makePlayers(this.props.players)}

				</div>

				<div className={teamDisplay ? '' : 'hidden'}>

					<h3>team 1</h3>
					<div>{this._makePlayers(this.props.match.team1)}</div>

					<h3>team 2</h3>
					<div>{this._makePlayers(this.props.match.team2)}</div>

				</div>

			</div>

		)
	}

})

const PlayerComponent = React.createClass({

	render: function(){


		return(

			<div className = 'players-of-match-wrapper'>

				<p>{this.props.player.name}</p>

			</div>

		)
	}

})


export default ArenaPage