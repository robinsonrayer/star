import { VANITY } from '../copy';
import { data, markDone, save } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header } from './ui';

export function vanityScene(handle: SceneHandle): void {
  const { body } = handle;

  const render = (): void => {
    const chosen = data.shades;
    body.innerHTML = '';
    const node = card(`
      ${header(VANITY.title, VANITY.intro)}
      <div class="shades" role="group" aria-label="shades">
        ${VANITY.shades
          .map(
            (shade, i) => `<button type="button" class="shade${chosen.includes(shade.name) ? ' is-on' : ''}" data-shade="${shade.name}" aria-pressed="${chosen.includes(shade.name)}">
              <span class="shade__swatch" style="--swatch:${shade.color}" aria-hidden="true"></span>
              <span class="shade__name">${shade.name}</span>
              <span class="shade__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            </button>`,
          )
          .join('')}
      </div>
      <div class="look">
        <p class="look__label">${chosen.length}/8</p>
        <ul class="look__lines">
          ${chosen
            .map((name) => {
              const shade = VANITY.shades.find((item) => item.name === name);
              return shade ? `<li><span class="look__dot" style="--swatch:${shade.color}"></span>${shade.line}</li>` : '';
            })
            .join('')}
        </ul>
      </div>
    `);

    const actions = el('div', 'scene-actions');
    actions.append(
      actionButton(chosen.length > 0 ? VANITY.finish : VANITY.shadeLabel, () => finish(), 'primary'),
    );
    node.append(actions);
    body.append(node);

    node.querySelectorAll<HTMLButtonElement>('[data-shade]').forEach((button) => {
      button.addEventListener('click', () => {
        const name = button.dataset.shade;
        if (!name || data.shades.includes(name)) return;
        data.shades.push(name);
        save();
        render();
        const next = body.querySelector<HTMLButtonElement>(`[data-shade="${name}"]`);
        next?.focus({ preventScroll: true });
      });
    });
  };

  const finish = (): void => {
    if (data.shades.length === 0) return;
    markDone('vanity');
    body.innerHTML = '';
    const node = card(`
      ${header(VANITY.cardTitle, VANITY.cardNote)}
      <div class="look-card">
        <div class="look-card__ring">
          ${data.shades
            .map((name) => {
              const shade = VANITY.shades.find((item) => item.name === name);
              return `<span style="--swatch:${shade?.color ?? '#e79aae'}"></span>`;
            })
            .join('')}
        </div>
        <ul class="look__lines">
          ${data.shades
            .map((name) => {
              const shade = VANITY.shades.find((item) => item.name === name);
              return shade ? `<li>${shade.line}</li>` : '';
            })
            .join('')}
        </ul>
      </div>
    `);
    const actions = el('div', 'scene-actions');
    actions.append(actionButton('keep it', () => handle.close(), 'primary'));
    node.append(actions);
    body.append(node);
    body.querySelector<HTMLButtonElement>('.btn')?.focus();
  };

  render();
  if (data.shades.length > 0) {
    body.querySelector<HTMLElement>('.look__lines')?.scrollIntoView({ block: 'nearest' });
  }
}
