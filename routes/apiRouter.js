let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

const Game = require('../db/schema.js').Game
const Arena = require('../db/schema.js').Arena
let User = require('../db/schema.js').User

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
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

    //GAME ROUTES
    apiRouter
    .get('/games', function(req, res){
      Game.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })
    .get('/games/:_id', function(req, res){
      Game.findById(req.params._id, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })
    .post('/games', function(request, response) {
      // a post request will include in the request body
        // the data that the client wants me to save under this 
        // collection.
        // i will make a new instance from the issue constructor, 
        // passing in the data from the request body.
      var newGame = new Game(request.body)
      newGame.save(function(error, record) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })
    .put('/games/:_id', function(req, res){

      Game.findByIdAndUpdate(req.params._id, req.body, function(err, record){
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
    .delete('/games/:gameId', function(request,response){
      Game.remove({_id: request.params.gameId}, function(error) {
        if (error) {
          return response.status(400).json(error)
        }
        response.json({
          msg: `target with id ${request.params.gameId} has been eliminated.`,
          id: request.params.gameId
        })
      })
    })

    //ARENA ROUTES
    apiRouter
    .get('/arenas', function(req, res){
      Arena.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })
    .get('/arenas/:_id', function(req, res){
      Arena.findById(req.params._id, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })
    .post('/arenas', function(request, response) {
      // a post request will include in the request body
        // the data that the client wants me to save under this 
        // collection.
        // i will make a new instance from the issue constructor, 
        // passing in the data from the request body.
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