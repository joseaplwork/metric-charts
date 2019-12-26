import { html } from 'lit-html';

import chartView from '@app/views/chart';

import './styles.css';

const chartSize = 200;

export default function metricsView(chartsInfo) {
  return html`
    <div class="metrics">
      ${chartsInfo.map(data => chartView(data, chartSize))}
    </div>
  `;
}
