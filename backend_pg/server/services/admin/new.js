const queries = require('../../queries');
const utils = require('../../utils');
const httpResponses = require('./');

let user, usernameCheck, passwordCheck;

const httpResponse = {
  onUserSaveSuccess: {
    success: true,
    message: 'Successfully created new user.'
  }
}

function save(request, response) {

  const { name, role, position, username, password, email, profileimg } = request.body;
  user = username;
  usernameCheck = username;
  passwordCheck = password;

  if (request.body.admin.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  if (performUpdateProfileChecks() !== true) {
    return response.json(performUpdateProfileChecks());
  }
  
  utils.checkUserControl(request.body.admin.id)
    .then(user => {

    	queries.createUser(username, password, email, name, position, role, profileimg, (err) => {
    		if (err) return response.json(err);
		return response.json(httpResponse.onUserSaveSuccess);
    	})	 

    }).catch(error => {
      return response.json(error);
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
  save: save
};
