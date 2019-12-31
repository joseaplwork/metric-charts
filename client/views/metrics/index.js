import { composeView } from '@app/utils/renderer';

import chartView from '@app/views/chart';

import './styles.css';

const chartSize = 200;

export default function metricsView(chartsInfo) {
  return composeView`
    <div class="metrics">
      ${chartsInfo.map(data => chartView(data, chartSize))}
    </div>
  `;
}
