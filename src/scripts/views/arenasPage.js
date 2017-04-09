import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

const ArenasPage = React.createClass({

	componentWillMount: function(){
		console.log(User.getCurrentUser())
		//var userId = ACTIONS.getUserId()
		ACTIONS.fetch_arenas()
		//ACTIONS.get_arenas_for_user(userId)
		
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

 	_handleLogin: function(evtObj){

 		evtObj.preventDefault()
		ACTIONS.logUserIn(evtObj.target.email.value, evtObj.target.password.value)

 	},

 	_handleRegister: function(evtObj){

 		evtObj.preventDefault()
		var formElement = evtObj.target
		console.log(formElement)
		var userData = {
			name: formElement.userName.value,
			email: formElement.email.value,
			password: formElement.password.value
		}

		ACTIONS.registerUser(userData)

 	},

 	render: function(){
 		console.log(this.state.arenaCollection)
 		return (

	 		<div className='arenas-page-wrapper'>

	 			
	 		</div>

 		)

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


export default ArenasPage