const queries = require('../../queries');
const utils = require('../../utils');
const httpResponses = require('./');
const bcrypt = require('bcrypt');

function fetchDetails(request, response) {
  
  const employeeID = request.query.employeeID;
    
    queries.getUserById(employeeID, (error, user) => {
    if (error) response.json(error);

    delete user.password;

    response.json(user);
  });
}

function updateDetails(request, response) {
 
  utils.getUser(request.body._id)
    .then(user => {
      
      let record = "name = '"+ request.body.name + "', email = '" + request.body.email + "', position = '" + request.body.position + "', username = '" + request.body.username + "'";
      
      record = request.body.profileimg ? record + ", profileimg = '"+ request.body.profileimg + "'" : record;

      if (request.body.password) {
      
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(request.body.password, salt);
	record = record + ", password = '" + hash + "'"
      }
           
      queries.updateUserById(request.body._id, record , (error) => {
        if (error) return response.json(error);
        return response.json(httpResponses.onUpdateSuccess);
      });
    })
    .catch(error => {
      return response.json(error);
    });
}

module.exports = {
  fetchDetails: fetchDetails,
  updateDetails: updateDetails
};
