const queries = require('../../queries');
const utils = require('../../utils');
const httpResponses = require('./');
const bcrypt = require('bcrypt');

let usernameCheck, passwordCheck;

function get(request, response) {
  if (request.query.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  utils.checkUserControl(request.query.id)
    .then(admin => {

      queries.getUserById(request.query.id, (error, user) => {
          if (error) return response.json(error);
          delete user.password;
          return response.json(user);
      })
    })
    .catch(error => {
      return response.json(httpResponses.onServerAdminFail);
    });
}

function update(request, response) {

let adminProfile = "name = '"+ request.body.name + "', email = '" + request.body.email + "', role = '" + request.body.role + "', username = '" + request.body.username + "'";

  usernameCheck = request.body.username;
  passwordCheck = request.body.password;
  
  if (request.body.password) {
      
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(request.body.password, salt);
	adminProfile = adminProfile + ", password = '" + hash + "'"
  }

  if (request.body.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  if (performUpdateProfileChecks() !== true) {
    return response.json(performUpdateProfileChecks());
  }

  utils.checkUserControl(request.body.id)
    .then(admin => {

      queries.updateUserById(request.body.id, adminProfile , (error) => {
          if (error) return response.json(error);
          return response.json(httpResponses.onProfileUpdateSuccess);
      });
    })
    .catch(error => {
      return response.json(httpResponses.onServerAdminFail);
    });
}

function performUpdateProfileChecks() {
  if (passwordCheck === '' && usernameCheck === '') {
    return httpResponses.onProfileUpdatePasswordCheckUserEmpty;
  }

  if (passwordCheck === '') {
    return httpResponses.onProfileUpdatePasswordEmpty;
  }

  if (usernameCheck === '') {
    return httpResponses.onProfileUpdateUsernameEmpty;
  }

  return true;
}

module.exports = {
  get: get,
  update: update
}
