'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../configs/db');
const queries = require('../../queries');

const httpResponse = {
  onUserNotFound: {
    success: false,
    message: 'User not found.'
  },
  onAuthenticationFail: {
    success: false,
    message: 'Passwords did not match.'
  }
}

let admin = false;
let http, userPassword, userUsername;

function loginUser(request, response) { 
  let { username, password } = request.body;
//console.log('user is '+ username+ ', pass is '+password+'!');

  queries.getUserByUsername(username, function(error, user) {

    if (error) return response.json(error);
    if (!user) {
	return response.json(httpResponse.onUserNotFound);
    } else {

      admin = true;
      userUsername = user.role;
      userPassword = password;
      http = response;
      
      comparePassword(user);
      
    }
  });

};

function comparePassword(user) {
  let responseToken;

  queries.comparePassword(userPassword, user.password, function(error, isMatch) {
    
    if (error) return http.json(error);
    
    if (isMatch && !error) {
      var token = jwt.sign(user, db.secret, {expiresIn: '12h'});

      
      if (user != null) {
        responseToken = { success: true, name: user.a_nkname, role: user.role, id: user._id, token: 'JWT ' + token };
      } 
      
      queries.updateUserById(user._id, 'status=true', (err) => {
        if (err) return http.json(err);
      });
      
      queries.createActivity(user.username,user.name + ' logged in', (err) => {if (err) return http.json(err);});
      
      return http.json(responseToken);
    }

    return http.json(httpResponse.onAuthenticationFail);
  });
}

module.exports = {
  loginUser: loginUser
};
