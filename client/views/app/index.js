import { html } from 'lit-html';

import './styles.css';

export default function AppView(content) {
  return html`
    <main>${content}</main>
  `;
}
