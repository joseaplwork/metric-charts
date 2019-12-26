import store from '@app/store';
import reducer from '@app/data/metrics/reducer';
import metricsView from '@app/views/metrics';

function metricsContainer(state) {
  const { chartsInfo } = state;

  return metricsView(chartsInfo);
}

store.subscribeReducer(reducer);

export default metricsContainer;
