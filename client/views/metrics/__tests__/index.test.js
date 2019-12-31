import { renderView, composeView } from '@app/utils/renderer';

import mockChartView from '@app/views/chart';

import metricsView from '..';

jest.mock('@app/views/chart');

describe('metrics view', () => {
  it('should render view  with given content', () => {
    const chartsInfo = [{ key: 1 }, { key: 2 }];

    mockChartView.mockReturnValue(composeView`
      <div class="chart"></div>
    `);

    renderView(metricsView(chartsInfo), document.body);

    const metricsNode = document.querySelector('.metrics');
    const chartNodes = document.querySelectorAll('.chart');

    expect(metricsNode).not.toBeNull();
    expect(chartNodes).not.toBeNull();
    expect(chartNodes.length).toEqual(chartsInfo.length);
  });
});
