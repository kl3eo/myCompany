const Employees = require('../../models/Employees');
const utils = require('../../utils');
const httpResponses = require('./');

let activity;

function fetchDetails(request, response) {
  const employeeID = request.query.employeeID;

  Employees.findOne({ _id: employeeID }, (error, doc) => {
    if (error) response.json(error);

    const employee = doc.toObject();

    delete employee.password;

    response.json(employee);
  });
}

function updateDetails(request, response) {
  let activityUser = '';
  utils.getUser(request.body._id)
    .then(user => {
      let query = {
        _id: request.body._id
      };

      let record = request.body.profileImg ? {
        name: request.body.name,
        email: request.body.email,
        position: request.body.position,
        username: request.body.username,
        password: request.body.password,
	profileImg: request.body.profileImg
      } : 
      {
        name: request.body.name,
        email: request.body.email,
        position: request.body.position,
        username: request.body.username,
        password: request.body.password
      };

      if (request.body.password === '') {
        delete record.password;
      }

      if (request.body.admin.access.toLowerCase() === 'admin') {
        record['role'] = request.body.role;
        activityUser = 'Admin';
        activity = `${activityUser} обновил профиль ${record.username}'.`;  
      } else {
        activityUser = user;
        activity = `${activityUser} обновил(а) свой профиль.`;
      }

      Employees.findOneAndUpdate(query, record, { new: true }, (error, doc) => {
        if (error) return response.json(error);
        utils.setActivity(activityUser, activity);
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
