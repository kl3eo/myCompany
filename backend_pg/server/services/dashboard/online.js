'use strict';
const queries = require('../../queries');
const utils = require('../../utils');

function onlineCount(request, response) {

  const id = request.query.id;
  utils.checkUserControl(id)
    .then(user => {
      queries.getUserByStatus( true, (error, users) => {
        if (error) return response.json(error);
        return response.json(users.length);
      });
    })
    .catch(error => {
      response.json(error);
    });
}

module.exports = {
  onlineCount: onlineCount
}
