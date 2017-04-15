let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
const Match = require('../db/schema.js').Match
const Team = require('../db/schema.js').Team
const Arena = require('../db/schema.js').Arena
  
  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('current_arena').populate('current_match').populate('current_team').populate('arenas').populate('matches')
    })

 
  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      }).populate('current_arena').populate('current_match').populate('current_team').populate('arenas').populate('matches')
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })

    //Match ROUTES
    apiRouter
    .get('/matches', function(req, res){
      Match.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('players').populate('winning_player').populate('team1').populate('team2').populate('creator')
    })
    .get('/matches/:_id', function(req, res){
      Match.findById(req.params._id, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('players').populate('winning_player').populate('team1').populate('team2').populate('creator')
    })
    .post('/matches', function(request, response) {
 
      var newMatch = new Match(request.body)
      newMatch.save(function(error, record) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })
    .put('/matches/:_id', function(req, res){

      Match.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })

    })
    .delete('/matches/:matchId', function(request,response){
      Match.remove({_id: request.params.matchId}, function(error) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json({
          msg: `target with id ${request.params.matchId} has been eliminated.`,
          id: request.params.matchId
        })
      })
    })

    //Team ROUTES
    apiRouter
    .get('/teams', function(req, res){
      Team.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('players').populate('creator')
    })
    .get('/teams/:_id', function(req, res){
      Team.findById(req.params._id, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('players').populate('creator')
    })
    .post('/teams', function(request, response) {
 
      var newTeam = new Team(request.body)
      newTeam.save(function(error, record) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })
    .put('/teams/:_id', function(req, res){

      Team.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })

    })
    .delete('/teams/:teamId', function(request,response){
      Team.remove({_id: request.params.teamId}, function(error) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json({
          msg: `target with id ${request.params.teamId} has been eliminated.`,
          id: request.params.teamId
        })
      })
    })

    //ARENA ROUTES
    apiRouter
    .get('/arenas', function(req, res){
      Arena.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('players').populate('matches')
    })
    .get('/arenas/:_id', function(req, res){
      Arena.findById(req.params._id, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('players').populate('matches')
    })
    .post('/arenas', function(request, response) {

      var newArena = new Arena(request.body)
      newArena.save(function(error, record) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })

    .put('/arenas/:_id', function(req, res){

      Arena.findByIdAndUpdate(req.params._id, req.body, function(err, record){

          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })

    })
    .delete('/arenas/:arenaId', function(request,response){

      Arena.remove({_id: request.params.arenaId}, function(error) {

        if (error) {
          return response.status(400).json(error)
        }
        response.json({
          msg: `target with id ${request.params.arenaId} has been eliminated.`,
          id: request.params.arenaId
        })
      })
    })

    // Routes for a Model(resource) should have this structure


module.exports = apiRouter