'use strict';
const queries = require('../../queries');
const utils = require('../../utils');

function employeesCount(request, response) {
  const id = request.query.id;

  utils.checkUserControl(id)
    .then(user => {
      queries.countItems('users', (error, count) => {
        if (error) response.json(error);

        response.json({ total: count });
      });
    })
    .catch(error => {
      response.json(error);
    });
}

module.exports = {
  employeesCount: employeesCount
};
