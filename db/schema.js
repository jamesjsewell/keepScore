const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const UsersSchema = new mongoose.Schema({
  
    // required for authentication: DO NOT TOUCH Or You May Get Punched
    email:     { type: String, required: true },
    password:  { type: String, required: true },
    // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
    
    // example of optional fields
    name:  { type: String },
    createdAt: { type: Date, default: Date.now },
    current_arena: { type: mongoose.Schema.Types.ObjectId, ref: 'Arena' },
    current_match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    current_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    arenas: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Arena'} ],
    matches: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Match'} ],
    first_name: { type: String },
    last_name: { type: String },
    avatar_url: { type: String },
    location: { type: String },
    about: { type: String },
    games_played: { type: Number },
    win_ratio: { type: Number }

})

const MatchSchema = new mongoose.Schema({

    name: { type: String },
    game_type: { type: String },
    queue_position: { type: Number },
  	arena: { type: String },
  	scores: { type: Object },
    winning_team: { type: String },
    winning_team_score: {type: Number},
    losing_team: { type: String},
    losing_team_score: { type: Number},
  	winning_score: { type: Number },
  	winning_player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  	players: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  	createdAt: { type: Date, default: Date.now },
    team1: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
    team2: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
    team1_name: { type: String },
    team2_name: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String }

})

const ArenaSchema = new mongoose.Schema({

    name: { type: String },
    matches: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Match'} ],
  	players: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
    queue_order: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Match'} ],
    active_match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' }

})


module.exports = {

    User: mongoose.model('User', UsersSchema),
    Match: mongoose.model('Match', MatchSchema),
    Arena: mongoose.model('Arena', ArenaSchema)

}
