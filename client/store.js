import { initialState as chartsInfoInitState } from '@app/data/metrics/reducer';
import { initialState as appInitState } from '@app/data/app/reducer';

const globalState = {
  ...chartsInfoInitState,
  ...appInitState,
};

export function setupStore(defaultState) {
  let state = defaultState || {};
  const subscribers = [];
  const reducers = [];
  const middlewares = [];

  const subscribeReducer = reducer => reducers.push(reducer);
  const subscribeMiddleware = middleware => middlewares.push(middleware);
  const subscribe = sub => subscribers.push(sub);
  const getState = () => state;
  const dispatch = action => {
    // Webpack will remove the below `if` statement in production mode
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('STORE:', state, action);
    }
    state = reducers.reduce((acc, reducer) => reducer(acc, action), state);
    middlewares.forEach(middleware => middleware(action));
    subscribers.forEach(subscriber => subscriber(state));
  };

  return {
    dispatch,
    getState,
    subscribe,
    subscribeReducer,
    subscribeMiddleware,
  };
}

export default setupStore(globalState);
