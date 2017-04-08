const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const UsersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  matches: {type: Array},
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
  // example of optional fields
  name:  { type: String },
  createdAt: { type: Date, default: Date.now },
  current_arena: { type: mongoose.Schema.Types.ObjectId, ref: 'Arena' },
  current_match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  current_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  arenas: [{ course: {type: mongoose.Schema.Types.ObjectId, ref: 'Arena'} }],
  first_name: { type: String },
  last_name: { type: String },
  avatar_url: { type: String },
  location: { type: String },
  about: { type: String },
  games_played: { type: Number },
  win_ratio: { type: Number }

})

const MatchSchema = new mongoose.Schema({

  queue_position: { type: Number },
	arena: { type: String },
	scores: [ Number ],
	winningScore: { type: Number },
	winningPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	players: [{ course: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} }],
	createdAt: { type: Date, default: Date.now }

})

const ArenaSchema = new mongoose.Schema({
 
  matches: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Match'} ],
	players: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  queue_order: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Match'} ],
  active_match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' }

})


module.exports = {

  User: mongoose.model('User', UsersSchema),
  Match: mongoose.model('Match', MatchSchema),
  Arena: mongoose.model('Arena', ArenaSchema)

}
