//import { getCookie } from '../../utils/cookies';
import { baseurl, handleResponse } from '../../utils/baseurl';


export const addEmployeeService = (request) => {
  let user = JSON.parse(localStorage.getItem('user'));
  let md5 = require('js-md5');
  
  const NEW_ENDPOINT = baseurl('admin/new');
  const USER_PROFILE_ENDPOINT = baseurl('admin/profileImg');

  var filename = ''

  if (request.profileImg) {	
    const formData = new FormData()
    formData.append('profileImg', request.profileImg)
 
    const options = {
      method: 'POST',
      headers: {
        'Authorization': user.token
      },
      body: formData
    };

    fetch(USER_PROFILE_ENDPOINT, options)
      .then(response => {return handleResponse(response)})    
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      })
      .catch(error => {
        return error;
      });
  
    let pieces = request.profileImg.name.split('.');
    const now = new Date()  
    const seconds_10_SinceEpoch = Math.round(now.getTime() / 10000)
    const str = md5(request.profileImg.name + seconds_10_SinceEpoch);
    const chu1 = str.substr(0,8);
    const chu2 = str.substr(8,4);
    const chu3 = str.substr(12,4);
    const chu4 = str.substr(16,4);
    const chu5 = str.substr(20,12);
    filename = chu1 + '-' + chu2 + '-' + chu3 + '-' + chu4 + '-' + chu5 + '.' + pieces[pieces.length-1];
  } 
  
  request.profileImg = filename;

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.token
    },
    body: JSON.stringify(request)
  };
  
  return fetch(NEW_ENDPOINT, parameters)
    .then(response => {return handleResponse(response)})    
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
//    .then( (function(){ window.location.href='new';}).delay(1000) )
    .catch(error => {
      return error;
    });
};
