import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import Navbar from './components/navBar.js'

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
		
		var userData = {
			name: formElement.userName.value,
			email: formElement.email.value,
			password: formElement.password.value
		}

		ACTIONS.registerUser(userData)

 	},

 	render: function(){

 		return (

	 		<div className='blue-grey darken-4 page-container'>

	 			<Navbar />

	 			<div className="col s12 container center-align m6 offset-m3 green accent-4">
					<div className = 'card green accent-3'>
						<h2 className="card-content title white-text center-align">Login</h2>
			 			<form className='card-content container center-align green accent-3' onSubmit={this._handleLogin} className='loginWrapper'>

			 				<div className="green accent-4 card-content input-field container white-text">
			 					<input className="white white-text" type='text' name='email' placeholder='enter email' className='email-input' />
			 				</div>

			 				<div className="green accent-4 card-content input-field container white-text">
			 					<input className="white white-text" type='password' name='password' placeholder='enter password' className='password-input' />
			 				</div>

			 				<button type='submit' className='container btn green accent-1 green-text flow-text' >Login</button>

			 			</form>
			 		</div>
				 </div>
	 			
	 			<div className="col s12 container center-align m6 offset-m3 green accent-4">

					<div className = 'card green accent-3'>
						<h2 className="title white-text center-align card-content">Register</h2>
			 			<form className='card-content container center-align green accent-3' onSubmit={this._handleRegister} className='submitWrapper'>

			 				<div className="green accent-4 card-content input-field container white-text">
			 					<input type='text' name='userName' placeholder="enter user name" className='password-input' />
			 				</div>

			 				<div className="green accent-4 card-content input-field container white-text">
			 					<input type='text' name='email' placeholder="enter email" className='email-input' />
			 				</div>

			 				<div className="green accent-4 card-content input-field container white-text">
			 					<input type='password' name='password' placeholder="enter password" className='password-input' />
			 				</div>

			 				<button className='container btn green accent-1 green-text flow-text' type='submit'>Register</button>

			 			</form>

			 		</div>

			 	</div>
	 			
	 		</div>

 		)

 	}

})

export default HomePage