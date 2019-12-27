import store from '@app/store';
import {
  getPercentage,
  formatNumber,
  formatPercentage,
} from '@app/utils/common';

import { updateMetricsState } from './actions';
import types, { colors } from './constants';

export default function metricsLogicMiddleware(action) {
  if (action.type === types.FETCH_METRICS_REQUEST_SUCCESS) {
    const chartsInfo = action.data.map(({ device, sector, suffix }, index) => {
      const { tablet, smartphone } = device;
      const total = tablet.value + smartphone.value;
      const formattedTotal = formatNumber(total, suffix);
      const tabletPercentage = getPercentage(tablet.value, total);
      const smartphonePercentage = getPercentage(smartphone.value, total);

      const hydratedDevice = {
        tablet: {
          ...tablet,
          percentage: tabletPercentage,
          formattedPercentage: formatPercentage(tabletPercentage),
          formattedValue: formatNumber(tablet.value, suffix),
          color: colors[index].primary,
        },
        smartphone: {
          ...smartphone,
          percentage: smartphonePercentage,
          formattedPercentage: formatPercentage(smartphonePercentage),
          formattedValue: formatNumber(smartphone.value, suffix),
          color: colors[index].secondary,
        },
      };

      return { sector, total, formattedTotal, device: hydratedDevice };
    });

    store.dispatch(updateMetricsState(chartsInfo));
  }
}
