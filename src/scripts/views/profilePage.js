import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
import Navbar from './components/navbar.js'
import filestack from 'filestack-js';

const apikey = 'AdJ0jZ9GGR6g4iEIZxIOwz';
const client = filestack.init(apikey);

const ProfilePage = React.createClass({

	componentWillMount: function(){

		ACTIONS.refresh_needed_data()
			
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

	_handleUpload: function(evt){

		evt.preventDefault()

		client.pick({
		accept: ['image/*'], maxSize: 2*1024*1024
		}).then(function(result) {
		//console.log(JSON.stringify(result.filesUploaded))
		//console.log(JSON.stringify(result.filesUploaded))
		//ACTIONS.add_image_to_user(JSON.parse(result.filesUploaded)[0].url)

		var theJson = JSON.parse(JSON.stringify(result.filesUploaded))
		console.log(theJson[0].url)
		ACTIONS.add_image_to_user(theJson[0].url)
		})

	},

 	render: function(){



 		if(this.state.current_arena != undefined && this.state.leaderboard_stats != undefined){
 			
			return (

		 		<div className='profile-page-wrapper'>
		 			
		 			<Navbar />
		 			<button onClick={this._handleUpload}>upload</button>

		 		</div>

			)

 		}

		else{

			return (

				<div className='arenas-page-wrapper'>

				</div>

			)

		}

 		return(

 			<div></div>

 		)	
 		
 	}

})

export default ProfilePage