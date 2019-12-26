import { html } from 'lit-html';

import pieView from './pie';
import infoView from './info';

import './styles.css';

export default function chartView(data, size) {
  const { sector, formattedTotal, device } = data;
  const { smartphone, tablet } = device;

  const pieElement = pieView(
    {
      title: sector,
      total: formattedTotal,
      primaryColor: smartphone.color,
      secondaryColor: tablet.color,
      primaryPercentage: smartphone.percentage,
      secondaryPercentage: tablet.percentage,
    },
    document.createElement('figure'),
    size
  );

  pieElement.classList.add('chart__graph');

  return html`
    <section class="chart">
      ${pieElement} ${infoView(device)}
    </section>
  `;
}
