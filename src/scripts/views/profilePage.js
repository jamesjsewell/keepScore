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

		 		<div className='profile-page-wrapper'>
		 			
		 			<Navbar />
		 			<h2>{User.getCurrentUser().attributes.name}</h2>
		 			<div>
		 				<img src={imgUrl} />
		 			</div>
		 			<button onClick={this._handleUpload}>upload</button>

		 			<h3>your arenas</h3>
		 			<div className='joined-arenas-wrapper'>
		 				{this._renderArenas(this.state.joined_arenas)}
		 			</div>


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
			<div>
				<div>{name}</div>
				<div>{numberOfPlayers} players</div>
				<button onClick={this._handleEnterArena} >{id === currentArena ? 'you are here' : 'enter arena'}</button>
			</div>
		)
		

	}

})

export default ProfilePage