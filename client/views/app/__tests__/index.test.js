import { render, html } from 'lit-html';

import appView from '..';

describe('app view', () => {
  it('should render view with given content', () => {
    const content = html`
      <h1>Test</h1>
    `;

    render(appView(content), document.body);

    const mainNode = document.querySelector('main');
    const h1Node = document.querySelector('h1');

    expect(mainNode).not.toBeNull();
    expect(h1Node).not.toBeNull();
  });
});
