const bcrypt = require('bcrypt');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'alex',
  host: 'localhost',
  database: 'clone',
  password: 'alex',
  port: 5432,
})

const deleteUser = (request, response, callback) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE _id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    callback(error,results.rows);
  })
}

const getUsers = (request, response, callback) => {
  pool.query('SELECT * FROM users ORDER BY _id ASC', (error, results) => {
    if (error) {
      throw error
    }
    callback(error,results.rows);
  })
}

const createUser = (username, password, email, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        password = hash;

	pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) returning *', [username, password, email], (error, results) => {
		if (error) throw(error);
		callback(error,results.rows[0]); 
	})
      })
    })
}

const updateUserById = (id, record, callback) => {

  pool.query(
    "UPDATE users SET " + record + " WHERE _id = $1",
    [id],
    (error, results) => { if (error) throw(error); callback(error);}
  )


}

const updateUserPassword = (username, password, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        password = hash;
        pool.query(
		"UPDATE users SET password = '"+password+"' WHERE username = $1",
		[username],
		(error, results) => {

			callback(error);
		}
	)
      })
    })
    
    
}

const getUserById = (id, callback) => {

if (id !== null) {
  pool.query('SELECT * FROM users WHERE _id = $1', [id], (error, results) => {
	if (error) throw(error);
	callback(error,results.rows[0]); 
  })
} else {
  pool.query('SELECT * FROM users limit 1', (error, results) => {
	if (error) throw(error);
	callback(error,results.rows[0]); 
  })
}
}

const getUserByUsername = (username, callback) => {


  pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
	if (error) throw(error);
	callback(error,results.rows[0]); 
  })
}

const comparePassword = function(pw1, pw2, cb) {
  bcrypt.compare(pw1, pw2, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};
//////////

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  comparePassword,
  createUser,
  updateUserById,
  updateUserPassword,
  deleteUser,
}
