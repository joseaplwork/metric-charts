import { composeView, renderView } from '../renderer';

describe('utils', () => {
  describe('renderer', () => {
    describe('composeView', () => {
      test('should return a composed structure for a view', () => {
        const expected = {
          strings: ['test-', ''],
          values: [1],
        };

        expect(composeView`test-${1}`).toEqual(expected);
      });
    });

    describe('renderView', () => {
      test('should return `null` no params provided', () => {
        expect(renderView()).toEqual(null);
      });

      test('should return content from basic template literal', () => {
        const element = document.createElement('div');
        const content = composeView`<h1>test</h1>`;
        const result = renderView(content, element);

        expect(result.innerHTML).toEqual('<h1>test</h1>');
      });

      test('should return content from template literal and expression', () => {
        const element = document.createElement('div');
        const content = composeView`<h1>test${1}</h1>`;
        const result = renderView(content, element);

        expect(result.innerHTML).toEqual('<h1>test1</h1>');
      });

      test('should return content from template literal and array map', () => {
        const element = document.createElement('div');
        const values = [1, 2, 3];
        const content = composeView`<h1>test${values.map(
          value => composeView`${value + 1}`
        )}</h1>`;

        const result = renderView(content, element);

        expect(result.innerHTML).toEqual('<h1>test234</h1>');
      });

      test('should return content from template literal and html node', () => {
        const p = document.createElement('p');
        p.innerHTML = 'test2';
        const element = document.createElement('div');
        const content = composeView`<h1>test${p}</h1>`;
        const result = renderView(content, element);

        expect(result.innerHTML).toEqual('<h1>test<p>test2</p></h1>');
      });
    });
  });
});
