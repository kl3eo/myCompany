'use strict';
const queries = require('../../queries');
const httpResponses = require('./');
const utils = require('../../utils');

function logoutUser(request, response) {
  utils.getUser(request.body.id)
  .then(user => {
	let id = request.body.id;
	queries.updateUserById(id, 'status=false', (err) => {
		if (err) return response.json(err);
		queries.getUserByUsername(user, function(error, user) {
			if (error) return response.json(err);
			queries.createActivity(user.username, user.name + ' logged out', (err) => {if (err) return response.json(err);});
		});

		return response.json(httpResponses.onStatusUpdateSuccess);
	});
  })
  .catch(error => {
      return response.json(error);
  });
}

module.exports = {
  logoutUser: logoutUser
};
