'use strict';
const queries = require('../../queries');
const httpResponses = require('./');

function logoutUser(request, response) {
  let id = request.body.id;
  queries.updateUserById(id, 'status=false', (err) => {
        if (err) return response.json(err);
	return response.json(httpResponses.onStatusUpdateSuccess);
  });
}

module.exports = {
  logoutUser: logoutUser
};
