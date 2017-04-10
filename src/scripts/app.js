import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomePage from './views/homePage.js'
import ArenasPage from './views/arenasPage.js'
import ArenaPage from './views/arenaPage.js'

const app = function() {

	const ScoreRouter = Backbone.Router.extend({

		routes: {
			'home': 'renderHomePage',
			'arena': 'renderArenaPage',
			'arenas': 'renderArenasPage',
			'*default': 'redirect'
		},
		redirect: function() {
			this.renderHomePage()
		},
		renderHomePage: function() {
			ReactDOM.render(<HomePage />, document.querySelector('.container'))
		},
		renderArenaPage: function() {
			ReactDOM.render(<ArenaPage />, document.querySelector('.container'))
		},
		renderArenasPage: function() {
			console.log('rendering arenas page')
			ReactDOM.render(<ArenasPage />, document.querySelector('.container'))
		},

		initialize: function() {
			var checkUserAuth = function() {

			}
			checkUserAuth()
			this.on('route', checkUserAuth)
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
