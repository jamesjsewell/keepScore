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

	getInitialState: function() {

		return STORE.data

	},

	_handleUpload: function(evt){

		evt.preventDefault()

		client.pick({
		accept: ['image/*'], maxSize: 2*1024*1024
		}).then(function(result) {

		var theJson = JSON.parse(JSON.stringify(result.filesUploaded))
		console.log(theJson[0].url)
		ACTIONS.add_image_to_user(theJson[0].url)
		})

	},

	_renderArenas: function(arenas){

		if(arenas != undefined){

			var arenasArray = [] 

			for(var i = 0; i < arenas.length; i++){

				arenasArray.push(<JoinedArenaComponent arena={arenas[i]} />)

			}

			return arenasArray

		}

	},

 	render: function(){

 		if(this.state.joined_arenas != undefined){
			
			var imgUrl = User.getCurrentUser().attributes.avatar_url
			console.log(imgUrl)

			return (

		 		<div className='blue-grey darken-4'>
		 			
		 			<Navbar />

		 			<div className="col s12 container center-align m6 offset-m3 green accent-4">
						<div className = 'card green accent-3'>
		 					<h4 className="card-content white-text center-align">{User.getCurrentUser().attributes.name}</h4>
				 			<div>
				 				<img id="profile-pic" className = "responsive-img" src={imgUrl} />
				 			</div>
		 					<button className='btn green accent-1 green-text flow-text' onClick={this._handleUpload}>upload</button>
		 				</div>
		 			</div>
			 			
	 				{this._renderArenas(this.state.joined_arenas)}


		 		</div>

			)

 		}

		else{

			return (

				<div className='blue-grey darken-4'>

				</div>

			)

		}

 		return(

 			<div></div>

 		)		
 		
 	}

})

const JoinedArenaComponent = React.createClass({

	_handleEnterArena: function(evt){

		evt.preventDefault()

		if(STORE.data.current_arena != undefined && STORE.data.current_arena != 'no current arena'){
			if(this.props.arena._id === STORE.data.current_arena[0].attributes._id){
				console.log('already in arena')
			}
			else{
				console.log('joining arena')
				ACTIONS.update_current_arena(this.props.arena._id)
			}
		}


	},

	render: function(){

		var name = "",
		numberOfPlayers="",
		id =""

		if(this.props.arena != undefined){

			var name = this.props.arena.name,
			numberOfPlayers = this.props.arena.players.length,
			id = this.props.arena._id

		}

		var currentArena = ""

		if(STORE.data.current_arena != undefined && STORE.data.current_arena != 'no current arena'){
			currentArena = STORE.data.current_arena[0].attributes._id
		}

		return(
			
			<div className="col s12 container center-align m6 offset-m3 green accent-4">
				<div className = 'card green accent-3'>
					<h3 className="card-content white-text center-align">{name}</h3>
					<h4 className="card-content white-text center-align">{numberOfPlayers} players</h4>
					<button className='btn green accent-1 green-text flow-text' onClick={this._handleEnterArena} >{id === currentArena ? 'you are here' : 'enter arena'}</button>
				</div>
			</div>
			
		)
		

	}

})

export default ProfilePage