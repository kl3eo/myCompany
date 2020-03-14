const queries = require('../../queries');
const utils = require('../../utils');
const httpResponses = require('./');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function setVacations(request, response) {

  const { start, end, employeeID } = request.body;

  queries.findVacation(start, end, employeeID, (error, doc) => {
    if (error) return response.json(error);
    if (doc) return response.json(httpResponses.onVacationExist);

    queries.createVacation(start, end, employeeID, (error, doc) => {
      if (error) return response.json(error);

      utils.getUser(request.body.employeeID)
        .then(user => {
		queries.getUserByUsername(user, function(error, user) {
			if (error) return response.json(err);
			queries.createActivity(user.username, user.name + ' set vacations', (err) => {if (err) return response.json(err);});
		});          
        }).catch(err => {
          return response.json(err);
        });

      return response.json(httpResponses.onSetVacationSuccess);
    });
  });
}

function fetchVacations(request, response) {
  queries.fetchVacations(request.query.id, (error, docs) => {
      if (error) return response.json(error);
      checkExpiredVacations(docs)
        .then(item => {
          formatDates(item)
            .then(dates => {
              return response.json(docs);
            });
        })
  });
}

function formatDates(vacations) {

  return new Promise((resolve, reject) => {
    let dates = vacations.map(item => {
      const startDate = new Date(item.start_date);

      const startDay = startDate.getDate();
      const startMonth = months[startDate.getMonth()];
      const startYear = startDate.getFullYear();

      const endDate = new Date(item.end_date);

      const endDay = endDate.getDate();
      const endMonth = months[endDate.getMonth()];
      const endYear = endDate.getFullYear();

      item['start'] = `${startMonth} ${startDay}, ${startYear}`;
      item['end'] = `${endMonth} ${endDay}, ${endYear}`;

      return item;
    });

    resolve(dates);
  });
}

function checkExpiredVacations(dates) {

  let index = 0;
  return new Promise((resolve, reject) => {
    const today = new Date();
    let date = dates.map(date => {
      index++;
      if (date.start < today) {
        date['expire'] = true;
        return date
      }

      return date;
    });

    if (index === dates.length) {
      resolve(date);
    }
  });
}

function deleteVacation(request, response) {
  
  queries.deleteVacation(request.body.id , (error) => {
    if (error) return response.json(error);
    
      utils.getUser(request.body.employeeID)
        .then(user => {
		queries.getUserByUsername(user, function(error, user) {
			if (error) return response.json(err);
			queries.createActivity(user.username, user.name + ' deleted vacations', (err) => {if (err) return response.json(err);});
		});          
        }).catch(err => {
          return response.json(err);
        });

      return response.json(httpResponses.onVacationDelete);

  });
}

module.exports = {
  setVacations: setVacations,
  fetchVacations: fetchVacations,
  deleteVacation: deleteVacation
};
