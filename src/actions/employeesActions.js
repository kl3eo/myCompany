import * as types from './';

export const employeeDetailsAction = (details) => {
  return {
    type: types.FETCH_EMPLOYEE_DETAILS,
    details
  }
};

export const fillDetailsAction = (response) => {
  return {
    type: types.FILL_EMPLOYEE_DETAILS,
    response
  }
};

export const employeeUpdateAction = (details) => {
  return {
    type: types.UPDATE_EMPLOYEE_DETAILS,
    details
  }
};

export const updateRefreshAction = (response) => {
  return {
    type: types.UPDATE_EMPLOYEE_DETAILS_REFRESH,
    response
  }
};

export const setVacationActions = (range) => {
  return {
    type: types.SET_VACATIONS,
    range
  }
};

export const fetchVacationActions = (id) => {
  return {
    type: types.FETCH_VACATIONS,
    id
  }
};

export const deleteVacationAction = (id) => {
  return {
    type: types.DELETE_VACATION,
    id
  }
};
