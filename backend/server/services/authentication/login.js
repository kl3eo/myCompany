'use strict';

const express = require('express');
const apiRoutes = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../../configs/db');

const User = require('../../models/User');
const Employees = require('../../models/Employees');
const Activities = require('../../models/Activities');

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
  User.findOne({
    username: username
  }, function(error, user) {
    if (error) return response.json(error);
    if (!user) {
      Employees.findOne({
        username: username,
        active: true
      }, (error, employee) => {
        if (error) return response.json(error);
        if (!employee) return response.json(httpResponse.onUserNotFound);
        admin = false;
        userUsername = employee.name;
        userPassword = password;
        http = response;

        comparePassword(employee);
      });
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

  user.comparePassword(userPassword, function(error, isMatch) {
    if (error) return http.json(error);
    if (isMatch && !error) {
      var token = jwt.sign(user.toJSON(), db.secret, {
        expiresIn: '12h'
      });

      if (!admin) {
        Employees.update({ username: userUsername }, { status: true }, (error, status) => {
        });
      }

      setActivity();

      if (user != null) {
        responseToken = { success: true, name: user.name, role: user.role, id: user._id, token: 'JWT ' + token };
      } 

      return http.json(responseToken);
    }

    return http.json(httpResponse.onAuthenticationFail);
  });
}

function setActivity() {
  new Activities({
    username: userUsername,
    activity: `${userUsername} зашёл в программу`
  }).save();

  userUsername = '';
  userPassword = '';
}

module.exports = {
  loginUser: loginUser
};
