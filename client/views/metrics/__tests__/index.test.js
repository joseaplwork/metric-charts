import { render, html } from 'lit-html';

import mockChartView from '@app/views/chart';

import metricsView from '..';

jest.mock('@app/views/chart');

describe('metrics view', () => {
  it('should render given content', () => {
    const chartsInfo = [{ key: 1 }, { key: 2 }];

    mockChartView.mockReturnValue(html`
      <div class="chart"></div>
    `);

    render(metricsView(chartsInfo), document.body);

    const metricsNode = document.querySelector('.metrics');
    const chartNodes = document.querySelectorAll('.chart');

    expect(metricsNode).not.toBeNull();
    expect(chartNodes).not.toBeNull();
    expect(chartNodes.length).toEqual(chartsInfo.length);
  });
});
