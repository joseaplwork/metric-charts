import * as d3 from 'd3';

export default function pieView(data, el, finalSize) {
  const {
    title,
    total,
    primaryColor,
    secondaryColor,
    primaryPercentage,
    secondaryPercentage,
  } = data;
  const element = el || document.createElement('div');
  const size = finalSize || 100;
  const radius = Math.round(size / 2);
  const rectSize = Math.round(size * 0.01);
  const rootFontSize = Math.round(size / 12);
  const rectPosition = Math.round(size / 2.25);
  const titlePosition = Math.round(size * 0.075);
  const colors = [primaryColor, secondaryColor];

  const pie = d3.pie().sort(null);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius);

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', size)
    .attr('height', size)
    .attr('font-size', rootFontSize)
    .append('g')
    .attr('transform', `translate(${size / 2}, ${size / 2})`);

  // Circle dashes
  const dashes = [
    { y: -rectPosition, x: 0 },
    { y: rectPosition - rectSize, x: 0 },
    { y: 0, x: -rectPosition },
    { y: 0, x: rectPosition - rectSize },
  ];

  dashes.forEach(({ y, x }) => {
    svg
      .append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', x ? rectSize : 1)
      .attr('height', y ? rectSize : 1);
  });

  // Circle
  svg
    .selectAll('path')
    .data(pie([primaryPercentage, secondaryPercentage]))
    .enter()
    .append('path')
    .attr('fill', (d, i) => colors[i])
    .attr('d', arc);

  // title text
  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1em')
    .attr('fill', '#a4a4a4')
    .attr('font-weight', '400')
    .attr('y', -titlePosition)
    .text(title);

  // Total text
  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.5em')
    .attr('fill', '#3f3f3f')
    .attr('dominant-baseline', 'central')
    .text(total);

  return element;
}
