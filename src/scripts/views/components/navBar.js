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

	componentDidMount: function(){
		console.log($('.button-collapse'))
		$(".button-collapse").sideNav();
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
 		//<a className="breadcrumb" href="#leaderboard">view leaderboard</a>
 		//<a className="breadcrumb" href="#teams">team builder</a>
 		var profileStatus = ''
 		var editArenasStatus = ''
 		var arenaStatus = ''
 		var joinArenaStatus = ''

 		if(location.hash === '#login' || location.hash === '#logout' || location.hash === '#home'){
 			var loginStatus = 'active'
 		}
 		if(location.hash === '#profile'){
 			var profileStatus = 'active'
 		}
 		if(location.hash === '#edit_arenas'){
 			var editArenasStatus = 'active'
 		}
 		if(location.hash === '#arena'){
 			var arenaStatus = 'active'
 		}
 		if(location.hash === '#join_arenas'){
 			var joinArenaStatus = 'active'
 		}
 		return (
 			<div>
				<h1 id='app-title'>gametrackr</h1>
	 			<div className="container center-align col s12 offset-m3 green accent-3">
		 			<nav id="navBar" className="green accent-3">
			 			<div className="nav-wrapper className='green accent-3">
			 			  <a data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
					 	  <ul className='green accent-3 left hide-on-med-and-down'>

				 			<li className={loginStatus}><a className="breadcrumb flow-text" onClick={this._handleLogout} href="#home">{User.getCurrentUser() === null || User.getCurrentUser().attributes._id === false ? 'login' : 'logout'}</a></li>	
				 			<li className={profileStatus}><a className="breadcrumb flow-text" href="#profile">my arenas</a></li>
							<li className={editArenasStatus}><a className="breadcrumb flow-text" href="#edit_arenas">create arenas</a></li>
							<li className={arenaStatus}><a className="breadcrumb flow-text" href="#arena">play</a></li>
							<li className={joinArenaStatus}><a className="breadcrumb flow-text" href="#join_arenas">find arenas</a></li>
						  </ul>

						  <ul className='green accent-3 side-nav' id='mobile-demo'>
				 			<li className={loginStatus}><a className="breadcrumb flow-text" onClick={this._handleLogout} href="#home">{User.getCurrentUser() === null || User.getCurrentUser().attributes._id === false ? 'login' : 'logout'}</a></li>	
				 			<li className={profileStatus}><a className="breadcrumb flow-text" href="#profile">my arenas</a></li>
							<li className={editArenasStatus}><a className="breadcrumb flow-text" href="#edit_arenas">create arenas</a></li>
							<li className={arenaStatus}><a className="breadcrumb flow-text" href="#arena">play</a></li>
							<li className={joinArenaStatus}><a className="breadcrumb flow-text" href="#join_arenas">find arenas</a></li>
						   </ul>
					 	</div>
			 		</nav>
			 		<img className={this.state.dataLoaded ? 'hide loading-gif' : 'loading-gif responsive-img'} src="images/loading.gif" />			
			 	</div>
			</div>
 		)

 	}

})


export default Navbar