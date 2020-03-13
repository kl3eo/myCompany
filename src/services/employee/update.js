//import { getCookie } from '../../utils/cookies';
import { baseurl, handleResponse } from '../../utils/baseurl';

export const updateEmployeeDetailsService = (request) => {
  
  let user = JSON.parse(localStorage.getItem('user'));
  let md5 = require('js-md5');
  
  const UPDATE_PROFILE = baseurl('employee/details');
  const USER_PROFILE_ENDPOINT = baseurl('admin/profileimg');
  var filename = ''

//console.log("running");
    let formData = new FormData()
    
  if (request.details.profileimg) {	
//console.log("step1, profileimg",request.details.profileimg);
    formData.append('profileimg', request.details.profileimg)

    let options = {
      method: 'POST',
      headers: {
        'Authorization': user.token
      },
      cache: 'no-store',
      body: formData
    };
//console.log("step2, formData",formData);

    fetch(USER_PROFILE_ENDPOINT, options)
      .then(response => {return handleResponse(response)})    
      .then(response => {
	return response.status(200).json();
      })
      .catch(error => {
        return error;
      }).then(response => console.log('Success:', JSON.stringify(response)));

//console.log("step3, after fetch, formData",formData);
      
    let pieces = request.details.profileimg.name.split('.');
    const now = new Date()  
    const seconds_10_SinceEpoch = Math.round(now.getTime() / 10000)
    const str = md5(request.details.profileimg.name + seconds_10_SinceEpoch);
    const chu1 = str.substr(0,8);
    const chu2 = str.substr(8,4);
    const chu3 = str.substr(12,4);
    const chu4 = str.substr(16,4);
    const chu5 = str.substr(20,12);
    filename = chu1 + '-' + chu2 + '-' + chu3 + '-' + chu4 + '-' + chu5 + '.' + pieces[pieces.length-1];
    request.details.profileimg = filename;
  } 

//console.log("details",request.details); 

  const parameters = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.token
    },
    body: JSON.stringify(request.details)
  };

  return fetch(UPDATE_PROFILE, parameters)
    .then(response => {return handleResponse(response)})    
    .then(response => {
      return response.json();
    })
    .catch(error => {
      return error;
    });
};
