import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomePage from './views/homePage.js'
import EditArenasPage from './views/editArenasPage.js'
import ArenaPage from './views/arenaPage.js'
import TeamBuilderPage from './views/teamBuilderPage.js'
import LeaderboardPage from './views/leaderboardPage.js'
import ProfilePage from './views/profilePage.js'
import JoinArenasPage from './views/joinArenasPage.js'
import User from './models/userModel.js'
import STORE from './store.js'

const app = function() {

	const ScoreRouter = Backbone.Router.extend({

		routes: {

			'home': 'renderLoginPage',
			'profile': 'renderProfilePage',
			'arena': 'renderArenaPage',
			'edit_arenas': 'renderEditArenasPage',
			'join_arenas': 'renderJoinArenasPage',
			'teams': 'renderTeamPage',
			'leaderboard': 'renderLeaderboardPage',
			'*default': 'redirect'

		},

		redirect: function() {

			this.renderLoginPage()

		},

		renderTeamPage: function(){

			ReactDOM.render(<TeamBuilderPage />, document.querySelector('.page-container-for-app'))

		},

		renderLoginPage: function() {

			ReactDOM.render(<HomePage />, document.querySelector('.page-container-for-app'))

		},

		renderProfilePage: function() {

			ReactDOM.render(<ProfilePage />, document.querySelector('.page-container-for-app'))

		},

		renderArenaPage: function() {

			ReactDOM.render(<ArenaPage />, document.querySelector('.page-container-for-app'))

		},
		
		renderEditArenasPage: function() {

			ReactDOM.render(<EditArenasPage />, document.querySelector('.page-container-for-app'))

		},

		renderJoinArenasPage: function() {

			ReactDOM.render(<JoinArenasPage />, document.querySelector('.page-container-for-app'))

		},

		renderLeaderboardPage: function() {

			ReactDOM.render(<LeaderboardPage />, document.querySelector('.page-container-for-app'))

		},

		initialize: function() {
		
			var checkUserAuth = function() {

				if(!User.getCurrentUser()){

					location.hash = 'home'
				}
			}
			
			checkUserAuth()

			this.on("route", checkUserAuth)
		}

	})

	new ScoreRouter
	Backbone.history.start()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
//Contact GitHub API Training Shop Blog About
