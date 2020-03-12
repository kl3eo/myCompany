const queries = require('../queries');

function checkUserControl(id) {

  return new Promise((resolve, reject) => {

    queries.getUserById(id, function(error, user) {
      if (error) reject(error);

      if (user && (user.role === 'Admin' || user.role === 'admin')) resolve(true);
      reject({ 
        success: false,
        message: 'This is a restricted area and can only be accessed by Admins.'
      });
    });
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    queries.getUserById(id, function(error, user) {
      if (error) reject(error);
      resolve(user.username);
    });
  });
}

module.exports = {
  checkUserControl: checkUserControl,
  getUser: getUser
};
