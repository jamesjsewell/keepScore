import STORE from './store.js'
import {MatchModel} from './models/matchModel.js'
import {ArenaModel} from './models/arenaModel.js'
import User from './models/userModel.js'
import $ from 'jquery'
import _ from 'underscore'

const ACTIONS = {

	perform_reset: function(){

		ACTIONS.get_queued_matches()
		ACTIONS.set_store_current_arena_of_selected_user()
		ACTIONS.get_completed_matches()
		ACTIONS.get_user()
		ACTIONS.set_store_selected_user(STORE.data.user.attributes._id)
	},

	//UPDATE STORE WITH DATA
	ajax_to_store: function(theUrl, storeKey, extension){

        $.ajax({

	        method: 'GET',
	        type: 'json',
	        url: theUrl

        })

        .done((response)=>{

        	var setObj = {}

        	if(extension){

        		setObj[storeKey] = response[extension]

        	}

        	else{

        		setObj[storeKey] = response

        	}
        	
 			STORE._set(setObj)

 			console.log(STORE.data)

 			if(storeKey === 'selected_user_current_arena'){

 				console.log(STORE.data.selected_user_current_arena._id)
 				ACTIONS.set_store_matches_for_arena(STORE.data.selected_user_current_arena._id)

 			}

 			if(storeKey === 'selected_user_arenas'){

 				ACTIONS.store_populate_arenas_current_user()
 			}


        })

        .fail((err)=>{

            console.log('could not access user', err)

        })

	},

	ajax_post_match: function(data){

	
		var name = data.name,
		position = data.position,
		type = data.type,
		players = data.players,
		team1 = data.team1, 
		team2 = data.team2,
		arena = data.arena

		$.ajax({

	            method: 'POST',
	            type: 'json',
	            url: 'api/matches',
	            data: {

				arena: arena,
				name: name,
				queue_position: position,
				game_type: type,
				players: players,
				team1: team1,
				team2: team2,
				team1_name: 'team1',
				team2_name: 'team2',
				status: 'inactive'

				}
	        
	        })
	        .done((res)=>{

	        	console.log('posted a new team match', res)
	       		ACTIONS.perform_reset()

	        })
	        .fail((err)=>{
	            console.log('could not post match', err)
	        })
	},

	delete_match: function(matchId){
		console.log(matchId)
		$.ajax({

	            method: 'delete',
	            type: 'json',
	            url: `api/matches/${matchId}`
	        
	        })
	        .done((res)=>{
	        	console.log('deleted a match', res)
	       		ACTIONS.perform_reset()

	        })
	        .fail((err)=>{
	            console.log('could not post match', err)
	        })

	},

	update_match_scores: function(inputScores, matchId, winningScore, winningPlayer){

		$.ajax({

	            method: 'put',
	            type: 'json',
	            url: `api/matches/${matchId}`,
	            data: {scores: inputScores, status: 'complete', winning_score: winningScore, winning_player: winningPlayer}
	            
	        })
	        .done((res)=>{
	        	console.log('updated the match scores', res)
	       		ACTIONS.perform_reset()
	       		//should update the status of the match to complete

	        })
	        .fail((err)=>{
	            console.log('could not post match', err)
	        })

	},

	set_match_to_active: function(match,arenaId){

	

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
		
		matchColl.fetch()

			.then(function() {

				STORE._set({
					matchCollection: matchColl
				})

			})	
	},

	get_queued_matches: function(arenaId){

		var matchColl = STORE.get('matchCollection')
		
		matchColl.fetch({arena: arenaId, status: 'inactive', status: 'active'})

			.then(function() {

				STORE._set({
					queued_match_collection: matchColl
				})
				console.log(STORE.data.queued_match_collection)

			})	
	},

	get_completed_matches: function(arenaId){

		var matchColl = STORE.get('matchCollection')
		
		matchColl.fetch({arena: arenaId, status: 'complete'})

			.then(function() {

				STORE._set({
					completed_match_collection: matchColl
				})
				console.log(STORE.data.completed_match_collection)

			})	
	},

	get_user: function(userId){
		
		STORE._set({'user': User.getCurrentUser()})
		console.log(STORE.data.user)

	},

	set_store_selected_user: function(userId){

		//ACTIONS.ajax_to_store(`api/users/${userId}`,'selected_user')
		STORE._set({selected_user: User.getCurrentUser()})
		//ACTIONS.set_store_arenas_of_selected_user(userId)
		//ACTIONS.set_store_current_arena_of_selected_user(userId)

	},
	//.set_store_current_arena_of_selected_user()
	set_store_current_arena_of_selected_user: function(userId){

		//ACTIONS.ajax_to_store(`api/users/${userId}`,'selected_user_current_arena','current_arena', {'players'})
		var arenaId = User.getCurrentUser().attributes.current_arena
		console.log(arenaId)
		var arenaColl = STORE.get('arenaCollection')
		
		arenaColl.fetch()
			.then(function(arena) {
				console.log(arenaColl)
				let currentArena = arenaColl.where({'_id': arenaId})
				console.log(currentArena)
				STORE._set({
					current_arena: currentArena
				})
			
				
				console.log(STORE.data)
			})	

	},

	set_store_arenas_of_selected_user: function(userId){
	
  		ACTIONS.ajax_to_store(`api/users/${userId}`,'selected_user_arenas','arenas')
  	   
	},

	store_populate_arenas_current_user: function(){

		// var userArenas = STORE.data.selected_user_arenas
		// var arenaIds = []

		// for(var i = 0; i < userArenas.length; i++){

		// 	arenaIds.push(userArenas[i]._id)

		// }

		
		// var filteredArenas = _.filter(Array.prototype.slice.call( STORE.data.arenaCollection.models, 0 ), function(model){ 

		// 	if(arenaIds.includes(model.attributes._id)){
		// 		return model
		// 	}

		// })

		// STORE._set({populated_user_arenas: filteredArenas})

		// ACTIONS.store_populate_current_arena_of_selected_user()

	},

	store_populate_current_arena_of_selected_user: function(){

		// console.log('populating the current arena')

		// var currentArena = _.find(Array.prototype.slice.call( STORE.data.arenaCollection.models, 0 ), function(model){ 

		// 	if(STORE.data.selected_user.current_arena._id === model.attributes._id){
		// 		return model
		// 	}
		// })

		// console.log(currentArena)

		// STORE._set({populated_user_current_arena: currentArena})

	},


	set_store_matches_for_arena: function(arenaId){

		var filteredMatches = _.filter(Array.prototype.slice.call( STORE.data.matchCollection.models, 0 ), function(model){ return model.attributes.arena == arenaId })
		STORE._set({selected_arena_matches: filteredMatches})

	},

	order_queue: function(){

		var matches = STORE.data.selected_arena_matches
		var ordered = []

		for(var i = 0; i < matches.length; i++){
			ordered.push(0)
		}

		for(var i = 0; i < ordered.length; i++){
			ordered[matches[i].queue_position] = matches[i]
		}

		STORE._set({'selected_arena_matches': ordered})

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
	create_match: function(gameType, matchData, name, team1, team2){

		if(gameType){
			
			var body = {}
			body['position'] = STORE.data.current_arena[0].attributes.queue_order.length+1
			body['players'] = matchData
			body['name'] = name
			body['type'] = gameType
			body['team1'] = team1
			body['team2'] = team2
			body['arena'] = STORE.data.current_arena[0]._id

			ACTIONS.ajax_post_match(body)

		}

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
					location.hash = 'home'
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
					STORE._set({userId: resp._id})
					
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

	}


}



export default ACTIONS