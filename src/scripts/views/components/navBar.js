import React from 'react'
import STORE from '../../store.js'
import ACTIONS from '../../actions.js'
import User from '../../models/userModel.js'

const Navbar = React.createClass({

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

	_handleLogout: function(evt){

		evt.preventDefault()

		if(User.getCurrentUser() != null){

			if(User.getCurrentUser().attributes.hasOwnProperty('_id') === false){

				

			}
			else{

				ACTIONS.logout()

			}

		}
	},

 	render: function(){

 		return (

	 		<ul className='navbar-wrapper'>

	 			<a href="#profile">my profile</a>
	 			<a href="#leaderboard">view leaderboard</a>
	 			<a href="#arena">arena</a>
	 			<a href="#teams">team builder</a>
				<a href="#edit_arenas">edit arenas</a>
				<a href="#join_arenas">join arenas</a>
				<a onClick={this._handleLogout} href="#home">{User.getCurrentUser() === null || User.getCurrentUser().attributes._id === false ? 'login' : 'logout'}</a>	

	 		</ul>

 		)

 	}

})


export default Navbar