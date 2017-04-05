import STORE from './store.js'
import {GameModel} from './models/gameModel.js'
import User from './models/userModel.js'

const ACTIONS = {

	getUserId: function(){
		console.log(User.getCurrentUser().attributes._id)
		return User.getCurrentUser().attributes._id

	},

	fetch_arenas: function(){

		// 	// we allow this function to be used with or without 
		// 		// a query object that will filter our fetch. 
		// 		// if no queryObject is passed in, it will be undefined,
		// 		// and we'll set it to be empty object.

		var arenaColl = STORE.get('arenaCollection')
		// backbone && jquery, on our behalf, will add a "GET" 
		// verb to the header of our request when we use 
		// .fetch()
		arenaColl.fetch()
			.then(function() {
				STORE._set({
					arenaCollection: arenaColl
				})
			})	

	},

	get_arenas_for_user: function(id){

		var arenaModels = STORE.get('arenaCollection')

		arenaModels.fetch()

			.then(function() {

				var arenasArray = []
				console.log(arenaModels.models[0].attributes.players)
				for(var i = 0; i < arenaModels.models.length; i++){

					var players = arenaModels.models[i].attributes.players
					console.log(players,id)

					for(var j = 0; j < players.length; j++){

						if(players[j] === id){
							console.log('found the id')
							arenasArray.push(arenaModels.models[i])

						}

					}

				}

				STORE._set({userArenas: arenasArray})
				return(arenasArray)
				
			})	

	},

	//ACTIONS FOR THE ARENA
	fetch_matches_for_arena: function(arenaId){


	},

	//user can only belong to this match
	return_current_match_for_user: function(arenaId, playerId){


	},

	//there is only one active match at any given time
	return_active_match_for_arena: function(arenaId){

	},

	//sets completed matches for the arena
	return_completed_matches_for_arena: function(arenaId){

	},

	//USER ACTIONS

	//Arena Logic
	create_match: function(){

	},

	add_match_to_queue: function(){

	},

	move_match_up_down: function(){

	},

	remove_match_from_queue: function(){

	},

	complete_match: function(){

	},

	logout: function() {
		User.logout()
			.done(
				function(resp) {
					alert('you logged out!')
					location.hash = 'login'
				})
			.fail(
				function(err) {
					alert('error logging out!')
					console.log(err)
				})
	},

	logUserIn: function(email,password) {
		User.login(email,password)
			.done(
				function(resp) {
					alert('logged in!')
					console.log(resp)
					location.hash = 'arenas'
				}
			)
			.fail(
				function(err) {
					alert('problem logging in!')
					console.log(err)
				})
	},

	registerUser: function(userData) {
		User.register(userData)
			.done(
				//success function
				function(resp) {
					alert(`new user ${resp.email} registered`)
					console.log(resp)
					ACTIONS.logUserIn(userData.email, userData.password)
				}
				)
			.fail(
				function(err) {
					alert('problem registering user!')
					console.log(err)
				}
				)
	}
}

export default ACTIONS