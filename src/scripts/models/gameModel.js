import Backbone from 'backbone'

export const GameModel = Backbone.Model.extend({
	// with a urlRoot property instead of just a url, 
		// backbone will append the id to the end of the
		// url for PUT or DELETE request
	// note that with our models, this only works if we've
	// specificed that _id is the id attribute. 
	urlRoot: '/api/games',
	// backbone uses the model's id for a lot of crucial 
	// functionality. it will look for a property called 
	// id on your record. 
	idAttribute: '_id'
})

// model.save()
// //for a PUT
// '/api/games/abd98r31jof89'
// // model.destroy()
// // for a DELETE
// '/api/games/abd98r31jof89'

export const GameCollection = Backbone.Collection.extend({
	
	comparator: function(mod) {
		// this tells backbone to sort the collection using 
			// the createdAt attribute on each model. 
		// the -1 makes the biggest the smallest, and the smallest
		// the biggest, so that i see the most recent model on top.
		return new Date(mod.get('createdAt')).getTime() * -1
	},
	model: GameModel,
	// since i'm sending this request to the same domain 
		// (be it localhost or myapp.herokuapp.com) 
		// that the index.html came from, 
		// i can just begin my url with a / and the browser
		// will know to send it to the domain of origin
	url: '/api/games'
})