import pieView from '../pie';

describe('pie view', () => {
  it('should render view with given data', () => {
    const data = {
      title: 'test',
      total: 'test',
      primaryColor: 'test',
      secondaryColor: 'test',
      primaryPercentage: 10,
      secondaryPercentage: 50,
    };

    const element = pieView(data);

    const svg = element.querySelector('svg');
    const mask = element.querySelector('mask');
    const texts = element.querySelectorAll('text');
    const circle = element.querySelectorAll('circle');
    const rects = element.querySelectorAll('rect');

    expect(svg).not.toBeNull();
    expect(mask).not.toBeNull();
    expect(circle).not.toBeNull();
    expect(texts.length).toEqual(2);
    expect(rects.length).toEqual(4);
  });
});
