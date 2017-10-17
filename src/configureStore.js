import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import todoApp from './reducers';

const thunk = (store) => (next) => (action) => {
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);
  }

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  // Order how the store.dispatch is overridden is important
  // since otherwise it would not return the expected values.

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;
