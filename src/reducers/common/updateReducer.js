import * as types from '../../actions/';

export default function(state = [], action) {
  const response = action.response;

  switch(action.type) {
    case types.UPDATE_EMPLOYEE_DETAILS_SUCCESS:
      return { ...state, response };
    case types.UPDATE_EMPLOYEE_DETAILS_REFRESH:
      return { ...state, response };
    default:
      return state;
  }
}
