import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import forgot from './forgotReducer';

import admin from './admin/adminReducer';
import list from './admin/listReducer';
import count from './admin/countReducer';
import online from './admin/onlineReducer';
import activities from './admin/activityReducer';
import deactivate from './admin/deactivateReducer';
import search from './admin/searchReducer';
import profile from './admin/profileReducer';
import updateProfile from './admin/updateReducer';

import vacations from './employee/vacationsReducer';

import fetchVacations from './common/fetchVacationsReducer';
import details from './common/detailsReducer';
import fill from './common/fillReducer';
import update from './common/updateReducer';

const rootReducer = combineReducers({
  register,
  login,
  forgot,
  admin,
  list,
  details,
  fill,
  update,
  count,
  online,
  activities,
  vacations,
  fetchVacations,
  deactivate,
  search,
  profile,
  updateProfile
});

export default rootReducer;
