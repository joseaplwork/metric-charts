import { renderView, composeView } from '@app/utils/renderer';

import appView from '..';

describe('app view', () => {
  it('should render view with given content', () => {
    const content = composeView`
      <h1>Test</h1>
    `;

    renderView(appView(content), document.body);

    const mainNode = document.querySelector('main');
    const h1Node = document.querySelector('h1');

    expect(mainNode).not.toBeNull();
    expect(h1Node).not.toBeNull();
  });
});
