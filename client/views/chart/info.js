import { html } from 'lit-html';

export default function infoView(data) {
  const { smartphone, tablet } = data;

  return html`
    <div class="chart__info">
      <div class="chart__info__side">
        <h4 style="color:${tablet.color}">Tablet</h4>
        <p>
          <span class="chart__info__side__percentage">
            ${tablet.formattedPercentage}
          </span>
          <span>${tablet.formattedValue}</span>
        </p>
      </div>
      <div class="chart__info__side chart__info__side--right">
        <h4 style="color:${smartphone.color}">Smartphone</h4>
        <p>
          <span class="chart__info__side__percentage">
            ${smartphone.formattedPercentage}
          </span>
          <span>${smartphone.formattedValue}</span>
        </p>
      </div>
    </div>
  `;
}
