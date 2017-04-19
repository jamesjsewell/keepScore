import STORE from './store.js'
import {MatchModel} from './models/matchModel.js'
import {ArenaModel} from './models/arenaModel.js'
import User from './models/userModel.js'
import $ from 'jquery'
import _ from 'underscore'

const ACTIONS = {

	refresh_needed_data: function(){

		ACTIONS.get_user()

	},

	//       MATCH ACTIONS        //

	create_match: function(gameType, matchData, name, team1, team2, team1Name, team2Name){
				
		if(gameType){
			
			var body = {}
			body['position'] = STORE.data.current_arena[0].attributes.queue_order.length+1
			body['players'] = matchData
			body['name'] = name
			body['type'] = gameType
			body['team1'] = team1
			body['team2'] = team2
			body['arena'] = STORE.data.current_arena_id
			body['team1_name'] = team1Name
			body['team2_name'] = team2Name

			ACTIONS.ajax_post_match(body)

		}

	},

	ajax_post_match: function(data){
	
		var name = data.name,
		position = data.position,
		type = data.type,
		players = data.players,
		team1 = data.team1, 
		team2 = data.team2,
		arena = data.arena,
		team1Name = data.team1_name,
		team2Name = data.team2_name

		console.log(arena)
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
				team1_name: team1Name,
				team2_name: team2Name,
				status: 'inactive',
				creator: STORE.data.userId

				}
	        
	        })
	        .done((res)=>{

	        	console.log('posted a new team match', res)
	        	ACTIONS.refresh_needed_data()
	        })
	        .fail((err)=>{
	            console.log('could not post match', err)
	        })
	},

	delete_match: function(matchId){

		$.ajax({

	            method: 'delete',
	            type: 'json',
	            url: `api/matches/${matchId}`
	        
	        })
	        .done((res)=>{
	        	console.log('deleted a match', res)
	       		ACTIONS.refresh_needed_data()

	        })
	        .fail((err)=>{
	            console.log('could not post match', err)
	        })

	},

	update_match_scores: function(inputScores, matchId, winningScore, winningPlayer, winningTeam, winningTeamScore, losingTeam, losingTeamScore){

		$.ajax({

	            method: 'put',
	            type: 'json',
	            url: `api/matches/${matchId}`,
	            data: {scores: inputScores, status: 'complete', winning_score: winningScore, winning_player: winningPlayer, winning_team: winningTeam, winning_team_score: winningTeamScore, losing_team: losingTeam, losing_team_score: losingTeamScore }
	            
	        })
	        .done((res)=>{
	        	console.log('updated the match scores', res)
	       		ACTIONS.refresh_needed_data()
	       		//should update the status of the match to complete

	        })
	        .fail((err)=>{
	            console.log('could not post match', err)
	        })

	},

	get_queued_matches: function(arenaId){

		var matchColl = STORE.get('matchCollection')
		
		matchColl.fetch({

				data: {arena: arenaId, status: 'inactive'}

			})

			.then(function(resp) {
			
				STORE._set({
					queued_match_collection: matchColl
				})

				ACTIONS.get_completed_matches(arenaId)

			})	
	},

	get_completed_matches: function(arenaId){

		var matchColl = STORE.get('completedMatchCollection')
		
		matchColl.fetch({

				data: {arena: arenaId, status: 'complete'}

			})

			.then(function() {
				
				STORE._set({
					completed_match_collection: matchColl
				})

				ACTIONS.calculate_leaderboard(matchColl)

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

	//   TEAM ACTIONS				//

	create_team: function(players, teamName){
			
			var body = {}
			body['players'] = players
			body['name'] = teamName
			body['creator'] = STORE.data.userId
			body['arena'] = STORE.data.current_arena_id

			$.ajax({

	            method: 'POST',
	            type: 'json',
	            url: 'api/teams',
	            data: body
	        
	        })
	        .done((res)=>{

	        	console.log('created a new team', res)
	        	ACTIONS.refresh_needed_data()
	        })
	        .fail((err)=>{
	            console.log('could not create team', err)
	        })

	},

	delete_team: function(teamId){

		$.ajax({

	            method: 'delete',
	            type: 'json',
	            url: `api/teams/${teamId}`
	        
	        })
	        .done((res)=>{
	        	console.log('deleted a team', res)
	       		ACTIONS.refresh_needed_data()

	        })
	        .fail((err)=>{
	            console.log('could not delete team', err)
	        })

	},

	get_teams_by_arena: function(arenaId){

		var teamColl = STORE.get('teamCollection')
		
		teamColl.fetch({

				data: {arena: arenaId}

			})

			.then(function() {
				
				STORE._set({
					team_collection: teamColl
				})

				ACTIONS.get_arenas_by_creator()

				console.log('set teams collection on store', STORE.data.team_collection)

			})	
	},

	//   	ARENA LOGIC             //

	create_arena: function(players, arenaName){
			
		var body = {}
		body['players'] = players
		body['name'] = arenaName
		body['creator'] = STORE.data.userId

		$.ajax({

            method: 'POST',
            type: 'json',
            url: 'api/arenas',
            data: body
        
        })
        .done((res)=>{

        	console.log('created a new arena', res)
        	ACTIONS.refresh_needed_data()
        })
        .fail((err)=>{
            console.log('could not create arena', err)
        })

	},

	update_arena: function(players, name, arenaId){

		$.ajax({

	            method: 'put',
	            type: 'json',
	            url: `api/arenas/${arenaId}`,
	            data: {players: players, name:name}
	            
	        })

	        .done((res)=>{

	        	console.log('updated the arena players', res)
	       		ACTIONS.refresh_needed_data()
	       		//should update the status of the match to complete

	        })

	        .fail((err)=>{

	            console.log('could not update the arena', err)

	        })

	},

	get_arenas_by_creator: function(){

		var arenaColl = STORE.get('userCreatedArenaColl')
		console.log(STORE.data.userId)
		arenaColl.fetch({

				data: {"creator": STORE.data.userId}

			})

			.then(function() {
				
				STORE._set({
					my_created_arenas: arenaColl.models
				})

				console.log('set my created arenas collection on store', STORE.data.my_created_arenas)

			})	

	},

	calculate_leaderboard: function(matches){

		var accumulativePlayerScores = {}

		for(var i = 0; i < matches.models.length; i++){

			var theMatch = matches.models[i].attributes

			var scoresObj = theMatch.scores

			var winningPlayer = theMatch.winning_player

			console.log(theMatch)
			for(var playerId in scoresObj){	

				var playerScore = scoresObj[playerId]

				if(accumulativePlayerScores[playerId] != undefined){

					if(accumulativePlayerScores[playerId]['points'] != undefined){

						accumulativePlayerScores[playerId]['points'] = Number(accumulativePlayerScores[playerId]['points']) + Number(playerScore)

					}

					if(winningPlayer._id != playerId){
						accumulativePlayerScores[playerId]['losses'] += 1
						accumulativePlayerScores[playerId]['wins'] += 0

					}
					else{
						accumulativePlayerScores[playerId]['wins'] += 1
						accumulativePlayerScores[playerId]['losses'] += 0
					}

					var wins = accumulativePlayerScores[playerId]['wins']
					var losses = accumulativePlayerScores[playerId]['losses']
					var matchesPlayed = wins+losses
					var winLoss = wins/matchesPlayed*100

					accumulativePlayerScores[playerId]['winLoss'] = winLoss

				}

				else{
					
					var setKey = {}
					setKey['points'] = Number(playerScore)

					if(winningPlayer._id != playerId){
						setKey['losses'] = 1
						setKey['wins'] = 0

					}
					else{
						setKey['wins'] = 1
						setKey['losses'] = 0
					}

					setKey['winLoss'] = 0

					setKey['id'] = playerId

					accumulativePlayerScores[playerId] = setKey

				}
			}
		}

		var ranked = _.sortBy(accumulativePlayerScores, 'winLoss')
		console.log(ranked)
		STORE._set({leaderboard_stats: ranked})

	},

	//------------------------------------------------//

	//   COLLECT HIGH LEVEL DATA    //

	fetch_arenas: function(){

		var arenaColl = STORE.get('arenaCollection')

		arenaColl.fetch()

			.then(function() {

				STORE._set({
					arenaCollection: arenaColl
				})
 		
			})	

	},

	query_user_by_name: function(userInput){
		///ab+c/i
		//"$new RegExp(/"+ userInput +"/, 'g')"
		var userColl = STORE.get('allUsersCollection')
		console.log(userInput, 'user input', "$new RegExp(/"+ userInput +"/, 'i')")
		userColl.fetch({

				data: {

					name: "$"+userInput

				}

			})

			.then(function() {
				console.log(userColl)
				STORE._set({
					auto_complete_users: userColl
				})

				console.log('set filtered users collection on store', userColl.models)
				console.log(STORE.data.auto_complete_users)

			})	

	},

	get_user: function(userId){
		
		STORE._set({'user': User.getCurrentUser()})
		STORE._set({'userId': User.getCurrentUser().attributes._id})
		ACTIONS.get_current_arena()

	},

	get_current_arena: function(userId){

		//ACTIONS.ajax_to_store(`api/users/${userId}`,'selected_user_current_arena','current_arena', {'players'})
		var arenaId = User.getCurrentUser().attributes.current_arena
		var arenaColl = STORE.get('arenaCollection')
		
		arenaColl.fetch()

			.then(function(arena) {

				let currentArena = arenaColl.where({'_id': arenaId})
				STORE._set({
					current_arena: currentArena,
					current_arena_id: currentArena[0].attributes._id
				})
				
				ACTIONS.get_queued_matches(STORE.data.current_arena_id)
				ACTIONS.get_teams_by_arena()

			})	

	},
	
	//----------------------------------------------------//

	set_status_of_player_in_arena: function(arenaId, playerId){

	},

	//there is only one active match at any given time
	return_active_match_for_arena: function(arenaId){

	},

	//----------------------------------------------------//
	

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
	}


}



export default ACTIONS