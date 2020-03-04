import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger();
  
  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware,loggerMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga)
  }
};

export default configureStore;
