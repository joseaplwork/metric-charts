import { composeView } from '@app/utils/renderer';

import './styles.css';

export default function AppView(content) {
  return composeView`
    <main>${content}</main>
  `;
}
