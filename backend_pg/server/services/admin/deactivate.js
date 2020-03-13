const queries = require('../../queries');
const utils = require('../../utils');
const httpResponses = require('./');

function deactivate(request, response) {

  if (request.body.admin.access.toLowerCase() !== 'admin') {
    return response.json(httpResponses.clientAdminFailed);
  }

  var user_active = true;
  var toggle_message = '';
  	
  utils.checkUserControl(request.body.admin.id)
    .then(admin => {
        queries.getUserById(request.body.id, (error, user) => {
		if (error) response.json(error);
//console.log("user",user);
		user_active = user.active;
		toggle_message = user_active ? 'Пользователь деактивирован': 'Пользователь успешно активирован!'

		let a = user_active ? false: true;

		queries.updateUserById(request.body.id, 'active='+a , (error) => {
			if (error) response.json(error);
			
			utils.getUser(request.body.id)
			.then(user => {

				response.json({ success: true, message: toggle_message + '\nPlease reload this page'});
			})
			.catch(error => {
				console.log(error);
			});
		})
	})
    })
    .catch(error => {
      response.json(httpResponses.onServerAdminFail);
    });
}

module.exports = {
  deactivate: deactivate
}
