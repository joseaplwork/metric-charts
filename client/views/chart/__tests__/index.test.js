import { render, html } from 'lit-html';

import mockPieView from '../pie';
import mockInfoView from '../info';
import chartView from '..';

jest.mock('../pie');
jest.mock('../info');

describe('app view', () => {
  it('should render given content', () => {
    const data = {
      sector: 'test',
      formattedTotal: 'test',
      device: { smartphone: {}, tablet: {} },
    };
    const pie = document.createElement('figure');

    mockPieView.mockReturnValueOnce(pie);
    mockInfoView.mockReturnValueOnce(html`
      <div id="info"></div>
    `);

    render(chartView(data), document.body);

    const chartNode = document.querySelector('.chart');
    const pieNode = document.querySelector('figure');
    const infoNode = document.querySelector('#info');

    expect(chartNode).not.toBeNull();
    expect(pieNode).not.toBeNull();
    expect(infoNode).not.toBeNull();
  });
});
