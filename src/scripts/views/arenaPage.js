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
		ACTIONS.set_store_selected_user('58e93f3186602d7bc21bc881')
		
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
		console.log(evt.target.value)

	},

	_handleSubmit: function(evt){

		evt.preventDefault()
		console.log(evt.target.gameType.value)

	},

	render: function(){
		//<PlayerChoiceComponent players={this.props.arena.players}/>
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

					<PlayerChoiceComponent players={this.props.arena.attributes.players}/>

  					<button type='submit'>add players</button>

				</form>

			</div>

		)

	}

})

const PlayerChoiceComponent = React.createClass({

	_processPlayers: function(players){

		var playersArray = []

		for(var i = 0; i < players.length; i++){

			playersArray.push(<ProcessPlayerComponent player={players[i]} />)

		}

		return(

			playersArray

		)


	},

	render: function(){

		return(

			<div name='playerSelect'>

				{this._processPlayers(this.props.players)}

			</div>

		)

	}

})

const ProcessPlayerComponent = React.createClass({

	render: function(){
		//<option value={this.props.player.email}>{this.props.player.name}</option>
		return(
			
			<label><input type="checkbox" name=	{this.props.player.email} value={this.props.player.email} />{this.props.player.name}</label>	

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