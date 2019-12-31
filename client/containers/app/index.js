import { renderView } from '@app/utils/renderer';

import store from '@app/store';
import reducer from '@app/data/app/reducer';
import appView from '@app/views/app';
import metricsContainer from '@app/containers/metrics';
import { fetchMetricsData } from '@app/data/metrics/actions';

function appContainer(state) {
  const rootNode = document.querySelector('#root');
  const { chartsInfo, isRequesting, isAppReady } = state;

  if (isAppReady && !isRequesting && !chartsInfo.length) {
    store.dispatch(fetchMetricsData());
  }

  renderView(appView(metricsContainer(state)), rootNode);
}

store.subscribeReducer(reducer);
store.subscribe(appContainer);

export default appContainer;
