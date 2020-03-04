import * as types from '../../actions/';

export default function(state = [], action) {
  const response = action.response;


  switch(action.type) {
    case types.FILL_EMPLOYEE_DETAILS:   
      return { ...state, response };
    default:
      return state;
  }
}
