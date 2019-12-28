import * as d3Selection from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import { max } from 'd3-array';

const d3 = { ...d3Selection, ...d3Shape, ...d3Scale, max };

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
  const wavePosition = Math.round(size * 0.4);
  const colors = [primaryColor, secondaryColor];
  const maskRadius = Math.round(size / 2.35);
  const waveSize = maskRadius * 2.25;
  const pie = d3.pie().sort(null);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius);

  // Main SVG
  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', size)
    .attr('height', size)
    .attr('font-size', rootFontSize)
    .append('g')
    .attr('transform', `translate(${size / 2}, ${size / 2})`);

  // Circles
  svg
    .selectAll('path')
    .data(pie([primaryPercentage, secondaryPercentage]))
    .enter()
    .append('path')
    .attr('fill', (d, i) => colors[i])
    .attr('d', arc);

  // Dashes
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

  // Wave graph
  const rangeData = [];
  const isPrimaryHigher = primaryPercentage > secondaryPercentage;

  if (isPrimaryHigher) {
    for (let i = secondaryPercentage; i <= primaryPercentage; i += 1) {
      rangeData.push(i);
    }
  } else {
    for (let i = secondaryPercentage; i >= primaryPercentage; i -= 1) {
      rangeData.push(i);
    }
  }

  const waveData = rangeData.reduce((acc, value, index) => {
    if (value === 0 || value === rangeData.length - 1 || value % 2 === 0) {
      const randomValue = Math.floor(Math.random() * 6) - 5;

      acc.push({ y: value + randomValue, x: index });
    }

    return acc;
  }, []);

  const xAxis = d3
    .scaleLinear()
    .domain([0, d3.max(waveData, d => d.x)])
    .range([waveSize, 0]);

  const yAxis = d3
    .scaleLinear()
    .domain([0, d3.max(waveData, d => d.y) * 2])
    .range([waveSize, 0]);

  const area = d3
    .area()
    .x(d => xAxis(d.x))
    .y0(waveSize)
    .y1(d => yAxis(d.y));

  svg
    .append('mask')
    .attr('id', `line-mask-${title}`)
    .append('path')
    .attr('class', 'pie--wavegraph--mask')
    .attr('transform', `translate(-${waveSize / 2}, -${wavePosition})`)
    .datum(waveData)
    .attr('d', area);

  // Circle wave mask
  svg
    .append('circle')
    .attr('mask', `url(#line-mask-${title})`)
    .attr('fill', secondaryColor)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', maskRadius);

  // Title text
  svg
    .append('text')
    .attr('class', 'pie--title')
    .attr('y', -titlePosition)
    .text(title);

  // Total text
  svg
    .append('text')
    .attr('class', 'pie--total')
    .text(total);

  return element;
}
