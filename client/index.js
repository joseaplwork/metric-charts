import store from '@app/store';
import apiMiddleware from '@app/api';
import metricsLogicMiddleware from '@app/data/metrics/middleware';
import appContainer from '@app/containers/app';

// Setup middlewares
store.subscribeMiddleware(apiMiddleware);
store.subscribeMiddleware(metricsLogicMiddleware);

// Run app
appContainer(store.getState());
