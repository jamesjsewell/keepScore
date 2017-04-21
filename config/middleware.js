const checkAuth = function(req, res, next){
  if(!req.user) {
    res.status(400).send( 'no authenticated user for current session' )
  }
  else next()
}

const errorHandler = function(err, req, res, next) {
  console.log(err)
  res.render(err);
  return
} 

const cookifyUser = function(req,res,next) {
  if (req.user) {
    res.cookie('keepScore_user',JSON.stringify(req.user))
    // res.cookie('keepScore', global.PROJECT_NAME)
    next()
  }
  else {
    res.cookie('keepScore_user','null')
    // res.cookie('keepScore', global.PROJECT_NAME)
    next()
  }
}

const parseQuery = function(req,res,next) {
  
  if (req.query) {
    for (var prop in req.query) {
      if (req.query[prop][0] === '$') {
        
        let val = req.query[prop]
        req.query[prop] = new RegExp(req.query[prop].substr(1), 'i')
        
      }
    }
  }
  next()
}

module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  cookifyUser: cookifyUser,
  parseQuery: parseQuery
}

