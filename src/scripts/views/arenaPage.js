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
		ACTIONS.set_store_arenas_of_selected_user('58e93f3186602d7bc21bc881')
		ACTIONS.set_store_current_arena_of_selected_user('58e93f3186602d7bc21bc881')
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

const UserArenasComponent = React.createClass({

	_makeArenas: function(arenas){
		console.log(arenas[0].attributes)
		var arenaArray = []

		for(var i = 0; i < arenas.length; i++){
			arenaArray.push(<SingleArenaComponent arena={arenas[i]} />)
		}

		return(arenaArray)

	},

	render: function(){

		if(this.props.arenas != undefined){

			return(
				<div className='arenas-wrapper'>

					{this._makeArenas(this.props.arenas)}

				</div>
			)

		}

		else{

			return(<div></div>)

		}
	}
})

const SingleArenaComponent = React.createClass({

	enter_arena: function(evtObj){
		evtObj.preventDefault()
		console.log(this.props.arena.attributes._id)
		console.log(ACTIONS.getUserId())
		ACTIONS.update_current_arena_for_player(this.props.arena.attributes._id, ACTIONS.getUserId())

	},

	render: function(){

		return(

			<div className = 'arena-wrapper'>
				<h1>{this.props.arena.attributes.players}</h1>
				<button onClick={this.enter_arena}>update</button>
			</div>

		)
	}
})


export default ArenaPage