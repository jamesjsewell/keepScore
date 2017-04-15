import Backbone from 'backbone'
import {MatchCollection} from './models/matchModel.js'
import {ArenaCollection} from './models/arenaModel.js'
import {ArenaModel} from './models/arenaModel.js'
import User from './models/userModel.js'

const STORE = Object.assign({}, Backbone.Events, {

	data: {

		arenaCollection: new ArenaCollection(),
		matchCollection: new MatchCollection(),
		completedMatchCollection: new MatchCollection(),
		userCollection: new User(),
		match_create_type: 'dual'
	},

	get: function(prop) {
		// simple declarative method to make it easier for 
			// other parts of our code to read information
			// stored on the .data object
		if (this.data[prop] === undefined) {
			// this line makes sure that an error will be thrown EARLY
				// if we try to read something that's not on the STORE's 
				// data object.
				// good for catching typos etc that could lead to nasty
				// errors down the line. 
			throw new Error('the store doesn\'t have a property called ' + prop)
		}
		return this.data[prop]
	},

	_set: function(attrs) {
		this.data = Object.assign(this.data,attrs)
		this.trigger('dataUpdated')
	}

})

export default STORE 