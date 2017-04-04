const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  games: {type: Array}
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const gameSchema = new mongoose.Schema({

	scores: { type: Array },
	winningScore: { type: String },
	winningPlayer: { type: String },
	players: { type: Array},
	createdAt: { type: Date, default: Date.now },

})

const arenaSchema = new mongoose.Schema({

	games: { type: Array },
	players: { type: Array },
	topPlayer: { type: Array}

})

module.exports = {

  User: mongoose.model('User', usersSchema),
  Game: mongoose.model('Game', gameSchema),
  Arena: mongoose.model('Arena', arenaSchema)

}
