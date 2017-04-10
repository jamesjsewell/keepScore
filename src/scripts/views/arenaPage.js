import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

const ArenaPage = React.createClass({

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

				 			<CreateMatchComponent arena={this.state.populated_user_current_arena} />
				 			<QueueComponent arena={this.state.populated_user_current_arena} queueMatches={this.state.selected_arena_matches} />

				 		</div>

 					)

 				}

 				else{

 					return (

	 					<div className='arenas-page-wrapper'>

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

			ACTIONS.create_match('ffa', playerInputsArray, 'testing')
			
			console.log(playerInputsArray)

		}

		if(STORE.data.match_create_type === 'team'){

			var playerInputsArray = []

			var players = evt.target.teamPlayer
			var team = evt.target.teamSelect

			for(var i = 0; i < players.length; i++){

				var playerEntry = {}
				playerEntry['player'+i] = {name: players[i].value, team: team[i].value}
				playerInputsArray.push(playerEntry)
			}

			console.log(playerInputsArray)

		}

		if(STORE.data.match_create_type === 'dual'){

		

			var player1 = evt.target.player1
			var player2 = evt.target.player2

			var playerInputsArray = [player1.value, player2.value]

			console.log(playerInputsArray)

		}


		// for(var i = 0; i < evt.target.teamPlayer.length; i++){
		// 	console.log(evt.target.teamPlayer[i].checked)
		// }

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

			matchArray.push(<MatchComponent matchName={matches[i].attributes.name} matchPlayers={players} />)

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

		return(

			<div className = 'match-wrapper'>

				<h2>{this.props.matchName}</h2>
				<h3>{this.props.matchPlayers}</h3>
				<button onClick={this.delete_match}>remove</button>

			</div>

		)
	}
})


export default ArenaPage