const Employees = require('../../models/Employees');

const utils = require('../../utils');
const httpResponses = require('./');

function deactivate(request, response) {
  if (request.body.admin.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  var employee_active = true;
  var toggle_message = '';	
  utils.checkUserControl(request.body.admin.id)
    .then(admin => {
        Employees.findOne({ _id: request.body.id }, (error, doc) => {
		if (error) response.json(error);
		employee_active = doc.toObject().active;
console.log('here ' + employee_active);

		toggle_message = employee_active ? 'Пользователь деактивирован': 'Пользователь успешно активирован!'
	})
    	.then(() => {
	    if (employee_active === true) {
		Employees.updateOne({ _id: request.body.id }, {
			active: false
			}, (error, doc) => {
			if (error) response.json(error);
			utils.getUser(request.body.id)
			.then(user => {
				activity = `Админ деактивировал ${user}`;
				utils.setActivity(user, activity);
				response.json({ success: true, message: toggle_message + '\nPlease reload this page'});
			})
			.catch(error => {
				console.log(error);
			});
		})
	    } else {
		Employees.updateOne({ _id: request.body.id }, {
			active: true
			}, (error, doc) => {
			if (error) response.json(error);
			utils.getUser(request.body.id)
			.then(user => {
				activity = `Админ активировал ${user}`;
				utils.setActivity(user, activity);
				response.json({ success: true, message: toggle_message + '\nPlease reload this page' });
			})
			.catch(error => {
				console.log(error);
			});
		})
	    }
	  }
	)
    })
    .catch(error => {
      response.json(httpResponses.onServerAdminFail);
    });
}

module.exports = {
  deactivate: deactivate
}
