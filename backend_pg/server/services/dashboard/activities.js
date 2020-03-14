'use strict';
const queries = require('../../queries');
const utils = require('../../utils');

function fetchActivities(request, response) {
  const id = request.query.id;

  utils.checkUserControl(id)
    .then(user => {
      queries.fetchActivities((error, docs) => {
          if (error) response.json(error);
          response.json(docs);
        });
    })
    .catch(error => {
      return response.json(error);
    });
}

module.exports = {
  fetchActivities: fetchActivities
};
