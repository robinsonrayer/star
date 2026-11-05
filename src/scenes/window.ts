import { WINDOW } from '../copy';
import { data, markDone, save } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, el, header, reduced } from './ui';

/**
 * A pentagram, tapped in drawing order: top, bottom right, top left, top
 * right, bottom left. The last tap closes the shape and gives the fifth line.
 */
const STARS: { x: number; y: number }[] = [
  { x: 196, y: 56 },
  { x: 262, y: 274 },
  { x: 90, y: 132 },
  { x: 302, y: 132 },
  { x: 128, y: 274 },
];

const SKY_W = 390;
const SKY_H = 320;

export function windowScene(handle: SceneHandle): void {
  let drawn = data.constellation;

  const closed = (): boolean => drawn >= STARS.length;

  const linesShown = (): number => (closed() ? WINDOW.lines.length : Math.max(0, drawn - 1));

  const svg = (): string => {
    const points = STARS.slice(0, drawn)
      .map((s) => `${s.x},${s.y}`)
      .join(' ');
    return `<svg class="sky" viewBox="0 0 ${SKY_W} ${SKY_H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="skyGlow" cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stop-color="#8a4460"/>
          <stop offset="1" stop-color="#1d1526"/>
        </radialGradient>
        <radialGradient id="starGlow">
          <stop offset="0" stop-color="#fff6d5" stop-opacity="1"/>
          <stop offset="1" stop-color="#fff6d5" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${SKY_W}" height="${SKY_H}" fill="url(#skyGlow)"/>
      <g fill="#fff6d5" opacity="0.45">
        ${Array.from({ length: 54 }, (_, i) => {
          const x = (i * 137) % 378 + 6;
          const y = (i * 91) % 300 + 10;
          return `<circle cx="${x}" cy="${y}" r="${i % 5 === 0 ? 1.4 : 0.85}"/>`;
        }).join('')}
      </g>
      ${
        drawn > 1
          ? `<polyline points="${points}" fill="none" stroke="#f4d98a" stroke-width="1.4" opacity="0.9"/>`
          : ''
      }
      ${closed() ? `<polygon points="${points}" fill="#f4d98a" opacity="0.08"/>` : ''}
      ${STARS.map((s, i) => {
        const on = i < drawn;
        const isNext = i === drawn;
        return `<g class="sky-star${on ? ' is-on' : ''}${isNext ? ' is-next' : ''}" data-star="${i}">
          ${isNext ? `<circle cx="${s.x}" cy="${s.y}" r="24" fill="url(#starGlow)" opacity="0.7"/>` : ''}
          <circle cx="${s.x}" cy="${s.y}" r="${on ? 5 : 3.6}" fill="${on ? '#fff8dd' : '#f4d98a'}"/>
          ${on ? `<circle cx="${s.x}" cy="${s.y}" r="11" fill="url(#starGlow)" opacity="0.55"/>` : ''}
        </g>`;
      }).join('')}
    </svg>`;
  };

  const render = (): void => {
    handle.body.innerHTML = '';
    const node = el('div', 'scene-card scene-card--sky');
    const shown = linesShown();

    node.innerHTML = `
      ${header(WINDOW.title, closed() ? WINDOW.done : WINDOW.intro)}
      <div class="sky-wrap">
        ${svg()}
        <div class="sky-hits">
          ${STARS.map(
            (s, i) =>
              `<button type="button" class="sky-hit" data-hit="${i}" aria-label="star ${i + 1}" style="left:${(s.x / SKY_W) * 100}%;top:${(s.y / SKY_H) * 100}%"></button>`,
          ).join('')}
        </div>
      </div>
      <ol class="sky-lines">
        ${WINDOW.lines
          .slice(0, shown)
          .map((line) => `<li>${line}</li>`)
          .join('')}
      </ol>
      <p class="sky-hint">${closed() ? '' : WINDOW.hint}</p>
    `;

    const actions = el('div', 'scene-actions');
    if (closed()) {
      actions.append(
        actionButton(
          WINDOW.again,
          () => {
            drawn = 0;
            data.constellation = 0;
            save();
            render();
          },
          'ghost',
        ),
        actionButton('close', () => handle.close(), 'primary'),
      );
    }
    node.append(actions);
    handle.body.append(node);

    node.querySelectorAll<HTMLButtonElement>('[data-hit]').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.hit);
        if (index !== drawn) {
          button.classList.add('is-wrong');
          window.setTimeout(() => button.classList.remove('is-wrong'), 320);
          return;
        }
        drawn += 1;
        data.constellation = drawn;
        save();
        if (drawn === STARS.length) {
          data.night = true;
          markDone('window');
          save();
        }
        render();
        const next = handle.body.querySelector<HTMLButtonElement>(
          `[data-hit="${Math.min(drawn, STARS.length - 1)}"]`,
        );
        next?.focus({ preventScroll: true });
      });
    });

    if (!reduced() && shown > 0) {
      node.querySelectorAll('.sky-lines li').forEach((item, i) => {
        (item as HTMLElement).style.setProperty('--delay', `${i * 60}ms`);
        item.classList.add('fade-up');
      });
    }
  };

  render();
}
