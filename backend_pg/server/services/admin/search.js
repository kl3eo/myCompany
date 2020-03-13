const queries = require('../../queries');
const utils = require('../../utils');
const httpResponses = require('./');

function search(request, response) {
  
  if (request.body.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  utils.checkUserControl(request.body.id)
    .then(admin => {
    
      let search = request.body.search;
 
      queries.getUserBySearch(search, (error, user) => {
        if (error) return response.json(error);
        return response.json(user)
      });
    })
    .catch(error => {
      return response.json(httpResponses.onServerAdminFail);
    });
}

module.exports = {
  search: search
};
