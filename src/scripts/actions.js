import STORE from './store.js'
import {MatchModel} from './models/matchModel.js'
import User from './models/userModel.js'
import $ from 'jquery'

const ACTIONS = {

	//UPDATE STORE WITH DATA
	ajax_to_store: function(theUrl, storeKey, extension){

        $.ajax({

	        method: 'GET',
	        type: 'json',
	        url: theUrl

        })

        .done((response)=>{

        	var setObj = {}
        	setObj[storeKey] = response[extension]
 			STORE._set(setObj)
 			console.log(STORE.data)

        })

        .fail((err)=>{

            console.log('could not access user', err)

        })

	},

	set_me_on_store: function(){

		if(User.getCurrentUser() != null){

			STORE._set( { logged_in_user: User.getCurrentUser().attributes } )
			console.log(STORE.data.logged_in_user)

		}

	},

	fetch_arenas: function(){

		var arenaColl = STORE.get('arenaCollection')

		arenaColl.fetch()

			.then(function() {

				STORE._set({
					arenaCollection: arenaColl
				})

			})	

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

	set_store_current_arena_of_selected_user: function(userId){

		ACTIONS.ajax_to_store(`api/users/${userId}`,'selected_user_current_arena','current_arena')

	},

	set_store_arenas_of_selected_user: function(userId){

  		ACTIONS.ajax_to_store(`api/users/${userId}`,'selected_user_arenas','arenas')
  		
        
	},

	set_store_matches_for_arena: function(arenaId){
		console.log('fetching matches for the arena')
		ACTIONS.ajax_to_store(`api/arenas/${arenaId}`,'selected_arena_matches','matches')

	},
	//----------------------------------------------------//

	//ACTIONS FOR THE ARENA

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