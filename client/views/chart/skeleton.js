import { composeView } from '@app/utils/renderer';

// import './styles.css';

export default function chartSkeletonView({
  primaryColor = '#eff5f5',
  secondaryColor = '#ffffff',
  height,
  width,
  repeat = 1,
  speed = 2,
}) {
  const skeletonContent = [];

  for (let index = 0; index < repeat; index += 1) {
    skeletonContent.push(`
      <svg
        viewBox="0 0 ${width} ${height}"
        height="${height}"
        width="${width}"
      >
        <defs>
          <clipPath id="skeleton_chart_clip">
            <circle cx="50%" cy="40%" r="35%"></circle>
            <rect x="1" width="40%" height="6%" rx="5" y="83%"></rect>
            <rect x="1" width="40%" height="6%" rx="5" y="93%"></rect>
            <rect x="59%" width="40%" height="6%" rx="5" y="83%"></rect>
            <rect x="59%" width="40%" height="6%" rx="5" y="93%"></rect>
          </clipPath>
          <linearGradient id="skeleton_chart_fill">
            <stop offset="0%" stop-color="${primaryColor}">
              <animate
                attributeName="offset"
                values="-2; 1"
                dur="${speed}s"
                repeatCount="indefinite">
              </animate>
            </stop>
            <stop offset="50%" stop-color="${secondaryColor}">
              <animate
                attributeName="offset"
                values="-1.5; 1.5"
                dur="${speed}s"
                repeatCount="indefinite">
              </animate>
            </stop>
            <stop offset="100%" stop-color="${primaryColor}">
              <animate
                attributeName="offset"
                values="-1; 2"
                dur="${speed}s"
                repeatCount="indefinite">
              </animate>
            </stop>
          </linearGradient>
        </defs>
        <rect
          fill="url(#skeleton_chart_fill)"
          clip-path="url(#skeleton_chart_clip)"
          x="0"
          y="0"
          height="${height}"
          width="${width}"
        />
      </svg>
    `);
  }

  return composeView`
    ${skeletonContent.join('')}
  `;
}
