import { call, put } from 'redux-saga/effects';
import { toggleActiveService } from '../../services/admin/deactivate';

import * as types from '../../actions';

export function* toggleActive(payload) {
  try {
    const response = yield call(toggleActiveService, payload);

    yield [
      put({ type: types.TOGGLE_ACTIVE_EMPLOYEE_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.TOGGLE_ACTIVE_EMPLOYEE_ERROR, error });
  }
};
