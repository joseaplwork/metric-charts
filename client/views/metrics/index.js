import { composeView } from '@app/utils/renderer';

import chartView from '@app/views/chart';
import chartSkeletonView from '@app/views/chart/skeleton';

import './styles.css';

const chartSize = 200;

export default function metricsView(chartsInfo) {
  if (!chartsInfo.length) {
    const skeletonOptions = {
      width: chartSize * 1.25,
      height: chartSize * 1.25,
      repeat: 3,
    };

    return composeView`
      <div class="metrics">
        ${chartSkeletonView(skeletonOptions)}
      </div>
    `;
  }

  return composeView`
    <div class="metrics">
      ${chartsInfo.map(data => chartView(data, chartSize))}
    </div>
  `;
}
