import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import Navbar from './components/navbar.js'

const HomePage = React.createClass({

	componentWillMount: function(){

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

	 			<Navbar />

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
	 			
	 		</div>

 		)

 	}

})

export default HomePage