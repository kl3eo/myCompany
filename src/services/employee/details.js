//import { getCookie } from '../../utils/cookies';
import { baseurl, handleResponse } from '../../utils/baseurl';
//import { Redirect } from 'react-router-dom';

export const fetchEmployeeDetailsService = (request) => {

  let user = JSON.parse(localStorage.getItem('user'));

  const employeeID = request.details.employeeID;
  
  const FETCH_PROFILE = baseurl(`employee/details?employeeID=${employeeID}`);

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.token
    }
  }

  return fetch(FETCH_PROFILE, parameters)
    .then(response => {return handleResponse(response)})    
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    }).catch(error => {
      return error;
    });

};
