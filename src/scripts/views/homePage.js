import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'

const HomePage = React.createClass({

	componentWillMount: function(){

		var userId = ACTIONS.getUserId()
		ACTIONS.fetch_arenas()
		ACTIONS.get_arenas_for_user(userId)
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

 		return (

	 		<div className='home-page-wrapper'>
	 			<form onSubmit={this._handleLogin} className='loginWrapper'>
	 				<input type='text' name='email' className='email-input' />
	 				<input type='password' name='password' className='password-input' />
	 				<button type='submit' className='login-button'/>
	 			</form>
	 			
	 			<form onSubmit={this._handleRegister} className='submitWrapper'>
	 				<input type='text' name='userName' className='password-input' />
	 				<input type='text' name='email' className='email-input' />
	 				<input type='password' name='password' className='password-input' />
	 				<button type='submit' className='register-button'/>
	 			</form>

	 			<UserArenasComponent arenas={this.state.userArenas} />
	 			
	 		</div>



 		)

 	}

})

const UserArenasComponent = React.createClass({

	_makeArenas: function(arenas){
		console.log(arenas)
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

	render: function(){

		return(

			<div className = 'arena-wrapper'>
				<h1>{this.props.arena._id}</h1>
			</div>

		)
	}
})


export default HomePage