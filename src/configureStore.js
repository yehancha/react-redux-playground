import { createStore } from 'redux';
import todoApp from './reducers';

const logger = (store) => (nextDispatch) => {
  if (!console.group) {
    return nextDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = nextDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const promise = (store) => (nextDispatch) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(nextDispatch);
  }
  return nextDispatch(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  )
}

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  // Order how the store.dispatch is overridden is important
  // since otherwise it would not return the expected values.

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
}

export default configureStore;
