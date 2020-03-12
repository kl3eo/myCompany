'use strict';

const express = require('express');
const queries = require('../../queries');

const httpResponses = {
  onValidationError: {
    success: false,
    message: 'Please enter email and password.'
  },
  onUserSaveError: {
    success: false,
    message: 'That email address already exists.'
  },
  onUserSaveSuccess: {
    success: true,
    message: 'Successfully created new user.'
  }
}

// Register new users
function registerUser(request, response) {
  let { username, password, email } = request.body;

  if (!username || !password) {
    response.json(httpResponses.onValidationError);
  } else {

    queries.createUser(username, password, email, (err,user) => {
    console.log("added user "+user.username+", id = "+user._id);
    })	 
  }
}

module.exports = {
  registerUser: registerUser
};
