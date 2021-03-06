import { renderView } from '@app/utils/renderer';

import infoView from '../info';

describe('info view', () => {
  it('should render view with given data', () => {
    const data = {
      smartphone: {
        formattedValue: 'test',
        formattedPercentage: 'test',
        color: 'test',
      },
      tablet: {
        formattedValue: 'test',
        formattedPercentage: 'test',
        color: 'test',
      },
    };

    renderView(infoView(data), document.body);

    const infoNode = document.querySelectorAll('.chart__info');
    const infoSideNode = document.querySelectorAll('.chart__info__side');
    const h4Nodes = document.querySelectorAll('h4');
    const percentageNodes = document.querySelectorAll(
      '.chart__info__side__percentage'
    );
    const valueNodes = document.querySelectorAll('span ~ span');

    expect(infoNode).not.toBeNull();
    expect(infoSideNode).not.toBeNull();
    expect(h4Nodes.length).toEqual(2);
    expect(percentageNodes.length).toEqual(2);
    expect(valueNodes.length).toEqual(2);
  });
});
