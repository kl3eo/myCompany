const httpResponses = require('./');
const queries = require('../../queries');

function forgotPassword(request, response) {
  const { password, username } = request.body;

//console.log('forgot: pass is '+password+', user is '+username);

  if (!password && !username) {
    return response.json(httpResponses.onUserPassEmpty);
  }

  if (!password) {
    return response.json(httpResponses.onPassEmpty);
  }

  if (!username) {
    return response.json(httpResponses.onUsernameEmpty);
  }

  queries.getUserByUsername(username, function(error, user) 
  {
      if (error) return response.json({success: false, message: error});
      queries.updateUserPassword(username, password, (err) => {
        if (err) return response.json(err);
        return response.json(httpResponses.onPasswordUpdateSuccess);
      });
    });
}

module.exports = {
  forgotPassword: forgotPassword
}
