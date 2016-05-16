var Login     = require('../models/login.js');

function saveUser(req,res){
  var userDetails = req.body;
  var reqSession = req.session;
  var newUser = new Login(userDetails);
  var response = {};
  newUser.save(function(err){
    if(err){
      response.success = false;
      response.error = err;
    }else{
      response.success = true;
      response.message = 'Stored User Details';
      reqSession.userDetails = userDetails;
    }
    res.json(response);
  });
}

function getUserFromSession(req,res){
  var response = {};
  if(req.session.userDetails){
    response.success = true;
    response.user  = req.session.userDetails;

  }else{
    response.success = false;
    response.message = 'User is not available in session';
  }
  res.json(response);
}

function logoutUser(req,res){
  var response = {};
  if(req.session.userDetails){
    req.session.userDetails = null;
    response.success = true;
    response.message  = 'Logout Success';

  }else{
    response.success = false;
    response.message = 'Already Logged out';
  }
  res.json(response);
}

module.exports = {
  saveUser:saveUser,
  getUser:getUserFromSession,
  logout:logoutUser
}
