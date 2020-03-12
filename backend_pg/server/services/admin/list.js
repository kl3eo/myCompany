const Employees = require('../../models/Employees');

const utils = require('../../utils');
const httpResponses = require('./');
const queries = require('../../queries');

function list(request, response) {

  if (request.query.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  utils.checkUserControl(request.query.id)
    .then(user => {
	queries.getUsers(request, response, (error, docs) => {
          if (error) return response.json(error);

          let updatedDocument = docs.map(doc => {
		delete doc.password;
		return doc;
          });

          return response.json(updatedDocument);
      });
    })
    .catch(error => {
      return response.json(httpResponses.onServerAdminFail);
    });
}

module.exports = {
  list: list
}
