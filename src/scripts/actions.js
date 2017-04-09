import STORE from './store.js'
import {MatchModel} from './models/matchModel.js'
import User from './models/userModel.js'
import $ from 'jquery'

const ACTIONS = {

	//UPDATE STORE WITH DATA
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

        $.ajax({
	        method: 'GET',
	        type: 'json',
	        url: `api/users/${id}`
        })
        .done((response)=>{

        	STORE._set({selected_user_arenas: response.arenas})
            console.log(STORE.data.selected_user_arenas)

        })
        .fail((err)=>{
            console.log('could not access user', err)
        })

	},
	//----------------------------------------------------//

	//ACTIONS FOR THE ARENA
	fetch_matches_for_arena: function(arenaId){


	},

	
	update_current_arena_for_player: function(newArenaId, playerId){

		//var thePlayer = playerId
		var thePlayer = User.getCurrentUser()

		var existingArena = thePlayer.attributes.current_arena_id

		console.log('the current arena for the user is', existingArena, 'the new arena id is', newArenaId)

		if(existingArena === newArenaId){

			console.log('this is already the current arena for the user')

		}

		else{

			thePlayer.set({
				current_arena_id: newArenaId
			})

			thePlayer.save().then(function() {
				// do whatever, set something on store, whatever's next
				console.log('user is now currently in a different arena', newArenaId)
			},
				function(err) {
					console.log('could not assign user to this arena')
					console.log(err)
				}
			)
		}

		ACTIONS.get_players_of_arena(existingArena)

	},

	fetch_matches: function(){

		var matchColl = STORE.get('matchCollection')
		// backbone && jquery, on our behalf, will add a "GET" 
		// verb to the header of our request when we use 
		// .fetch()
		matchColl.fetch()
			.then(function() {
				STORE._set({
					matchCollection: matchColl
				})
			})	
	},

	set_status_of_player_in_arena: function(arenaId, playerId){

		// $.ajax({
  //           method: 'GET',
  //           type: 'json',
  //           url: `api/arenas/${arenaId}`,
  //       })
  //       .done((res)=>{


  //       	var playersArray = res.players

  //       	for(var i = 0; i < playersArray.length; i++){

  //       		var player = playersArray[i]
        		
  //       		if(player._id === playerId){

  //       			$.ajax({
		//             method: 'PUT',
		//             type: 'json',
		//             url: `api/arenas/${arenaId}`,
		//             data: newData
		//             })
		//             .done((res)=>{
		//                 console.log('got data')
		//                 console.log(res)
		//                 console.log('changed user data')
		//             })	
  //       		}
  //       	}

  //           var newData = {}
  //           $.ajax({
  //           method: 'PUT',
  //           type: 'json',
  //           url: `api/arenas/${arenaId}`,
  //           data: newData
  //           })
  //           .done((res)=>{
  //               console.log('got data')
  //               console.log(res)
  //               console.log('changed user data')
  //           })
  //           .fail((err)=>{
  //               console.log('bad ajax request', err)
  //           })

	},

	//there is only one active match at any given time
	return_active_match_for_arena: function(arenaId){

	},

	//sets completed matches for the arena
	return_completed_matches_for_arena: function(arenaId){

	},
	//----------------------------------------------------//
	
	//USER INPUT ACTIONS

	//Arena Logic
	create_match: function(arenaId, matchData){
		//will send a post or put request to update an inactive match possibly

	},

	add_match_to_queue: function(matchId, arenaId){
		//will get the queue array
		//put a new match id on the queue array
		//update the queue array in the database
	},

	move_match_up_down_the_queue: function(matchId, arenaId){
		//will get the queue array
		//re-arrange the queue array
		//update the queue array in the database
	},

	remove_match_from_queue: function(matchId, arenaId){
		//will get the queue array
		//re-arrange the queue array
		//update the queue array in the database
	},

	complete_match: function(matchId, arenaId, matchData){
		//will get the queue array
		//re-arrange the queue array
		//update the match history section
	},

	modify_queue_sequence: function(arenaId, modification){
		//will modify the sequence of the queue
	},
	//----------------------------------------------------//

	//USER LOGIN FLOW

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
					location.hash = 'arena'
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
	},

	getUserId: function(){
		//console.log(User.getCurrentUser().attributes._id)
		return User.getCurrentUser().attributes._id

	},


}

export default ACTIONS