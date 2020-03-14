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

const countItems = (table, callback) => {
  pool.query('SELECT count(*) as count FROM ' + table, (error, results) => {
    if (error) {
      throw error
    }
    callback(error,results.rows[0].count);
  })
}

const fetchActivities = (callback) => {
  pool.query('SELECT * FROM activities ORDER BY createdAt DESC', (error, results) => {
    if (error) {
      throw error
    }
    callback(error,results.rows);
  })
}

const createActivity = (username, activity, callback) => {


	pool.query('INSERT INTO activities (username, activity, createdAt) VALUES ($1, $2, now()) returning *', [username, activity], (error, results) => {
		if (error) throw(error);
		callback(error,results.rows[0]); 
	})

}

const findVacation = (start, end, id, callback) => {


	pool.query('SELECT * from vacations where start_date <= $1 and end_date >= $2 and employeeID = $3', [start, end, id], (error, results) => {
		if (error) throw(error);
		callback(error,results.rows[0]); 
	})

}

const createVacation = (start, end, id, callback) => {


	pool.query('INSERT INTO vacations (start_date, end_date, employeeID, createdAt) VALUES ($1, $2, $3, now()) returning *', [start, end, id], (error, results) => {
		if (error) throw(error);
		callback(error,results.rows[0]); 
	})

}

const fetchVacations = (id, callback) => {

  pool.query('SELECT * FROM vacations where employeeID = $1 ORDER BY start_date DESC', [id], (error, results) => {
    if (error) {
      throw error
    }
    callback(error, results.rows);
  })
}

const deleteVacation = (id, callback) => {

	pool.query('DELETE FROM vacations WHERE _id = $1 ', [id], (error) => {
		if (error) throw(error);
		callback(error); 
	})

}

const createUser = (username, password, email, name, position, role, profileimg, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        password = hash;

	pool.query('INSERT INTO users (username, password, email, name, position, role, profileimg) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [username, password, email, name, position, role, profileimg], (error, results) => {
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

const getUserBySearch = (search, callback) => {


  pool.query('SELECT * FROM users WHERE username ~ $1 or name ~ $1', [search], (error, results) => {
	if (error) throw(error);
	callback(error,results.rows[0]); 
  })
}

const getUserByStatus = (status, callback) => {


  pool.query('SELECT * FROM users WHERE status is ' + status, (error, results) => {
	if (error) throw(error);
	callback(error,results.rows); 
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
  countItems,
  getUserById,
  getUserByUsername,
  getUserBySearch,
  getUserByStatus,
  comparePassword,
  createUser,
  updateUserById,
  updateUserPassword,
  deleteUser,
  fetchActivities,
  createActivity,
  fetchVacations,
  findVacation,
  createVacation,
  deleteVacation
}
