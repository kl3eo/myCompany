const Employees = require('../../models/Employees');
const Activities = require('../../models/Activities');

const utils = require('../../utils');
const httpResponses = require('./');


let user, activity, usernameCheck, passwordCheck;

function save(request, response) {
  const { name, role, position, username, password, email, profileimg } = request.body;
  user = username;
  usernameCheck = username;
  passwordCheck = password;
console.log(name);
console.log(profileimg);
  if (request.body.admin.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  if (performUpdateProfileChecks() !== true) {
    return response.json(performUpdateProfileChecks());
  }
  
  utils.checkUserControl(request.body.admin.id)
    .then(user => {
      let employee = new Employees({ name, email, role, position, profileimg, username, password, status: false, active: true });

      employee.save(error => {
        if (error) return response.json(error);

        activity = `Admin создал профиль ${request.body.name}`;

        utils.setActivity(request.body.name, activity);

        return response.json(httpResponses.employeeAddedSuccessfully);
      });
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
