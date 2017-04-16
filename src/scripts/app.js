import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomePage from './views/homePage.js'
import ArenasPage from './views/arenasPage.js'
import ArenaPage from './views/arenaPage.js'
import TeamBuilderPage from './views/teamBuilderPage.js'
import User from './models/userModel.js'
import STORE from './store.js'

const app = function() {

	const ScoreRouter = Backbone.Router.extend({

		routes: {

			'home': 'renderLoginPage',
			'arena': 'renderArenaPage',
			'arenas': 'renderArenasPage',
			'teams': 'renderTeamPage',
			'*default': 'redirect'

		},

		redirect: function() {

			this.renderLoginPage()

		},

		renderTeamPage: function(){

			ReactDOM.render(<TeamBuilderPage />, document.querySelector('.container'))

		},

		renderLoginPage: function() {

			ReactDOM.render(<HomePage />, document.querySelector('.container'))

		},

		renderArenaPage: function() {

			ReactDOM.render(<ArenaPage />, document.querySelector('.container'))

		},
		
		renderArenasPage: function() {

			ReactDOM.render(<ArenasPage />, document.querySelector('.container'))

		},

		initialize: function() {
		
			var checkUserAuth = function() {


				if(User.getCurrentUser() === null){

					location.hash = 'home'

				}

				else{

					location.hash = 'arena'

				}

			}
			
			checkUserAuth()

			this.on("route", checkUserAuth())
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
