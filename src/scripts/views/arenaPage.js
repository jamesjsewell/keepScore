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
		ACTIONS.set_store_matches_for_arena('58e8d8b4e8865e7a8b19c6c4')
		
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

 	render: function(){

 		if(User.getCurrentUser() != null){

 			return (

		 		<div className='arenas-page-wrapper'>

		 			<QueueComponent queueMatches={this.state.selected_arena_matches} />

		 			
		 		</div>

 			)

 		}

 		else{

 			return (

		 		<div className='arenas-page-wrapper'>
		 			<h2>you are not logged in</h2>
		 		</div>

 			)
 		}	
 		
 	}

})

const QueueComponent = React.createClass({

	_makeMatches: function(matches){
	
		var matchArray = []

		for(var i = 0; i < matches.length; i++){

			matchArray.push(<MatchComponent match={matches[i]} />)

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
		//ACTIONS.update_current_arena_for_player(this.props.arena.attributes._id, ACTIONS.getUserId())

	},

	render: function(){

		return(

			<div className = 'match-wrapper'>
				<h2>{this.props.match.name}</h2>
				<h3>{this.props.match.players}</h3>
				<button onClick={this.delete_match}>remove</button>
			</div>

		)
	}
})


export default ArenaPage