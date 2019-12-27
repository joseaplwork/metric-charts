import { render } from 'lit-html';

import store from '@app/store';
import reducer from '@app/data/app/reducer';
import appView from '@app/views/app';
import metricsContainer from '@app/containers/metrics';
import { fetchMetricsData } from '@app/data/metrics/actions';

function appContainer(state) {
  const { chartsInfo, isRequesting, isAppReady } = state;
  const rootElement = document.querySelector('#root');

  if (isAppReady && !isRequesting && !chartsInfo.length) {
    store.dispatch(fetchMetricsData());
  }

  render(appView(metricsContainer(state)), rootElement);
}

store.subscribeReducer(reducer);
store.subscribe(appContainer);

export default appContainer;
