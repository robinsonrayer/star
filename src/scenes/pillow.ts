import { PILLOW } from '../copy';
import { markDone } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header } from './ui';

export function pillowScene(handle: SceneHandle): void {
  markDone('pillow');
  let index = 0;

  const node = card(`
    ${header(PILLOW.title, '')}
    <div class="pillow-art">
      <svg class="pillow-art__shape" viewBox="0 0 240 200" aria-hidden="true">
        <ellipse cx="120" cy="186" rx="78" ry="8" fill="#6b3a45" opacity="0.14"/>
        <path d="M40 44c-14 10-22 26-22 44v34c0 18 8 32 22 42 8 6 18 8 30 8h100c12 0 22-2 30-8 14-10 22-24 22-42V88c0-18-8-34-22-44-8-6-18-8-30-8H70c-12 0-22 2-30 8Z" fill="#fffdf9" stroke="var(--ink)" stroke-width="3"/>
        <path d="M40 44c14 10 22 22 22 38M200 44c-14 10-22 22-22 38" fill="none" stroke="var(--rose)" stroke-width="2" opacity="0.5"/>
        <!-- face -->
        <path d="M88 104c0 8 7 13 15 13s15-5 15-13" fill="none" stroke="var(--ink)" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M122 104c0 8 7 13 15 13s15-5 15-13" fill="none" stroke="var(--ink)" stroke-width="3.4" stroke-linecap="round"/>
        <ellipse cx="120" cy="128" rx="9" ry="6" fill="var(--gold)" stroke="var(--ink)" stroke-width="2"/>
        <ellipse cx="84" cy="126" rx="9" ry="5" fill="var(--rose)" opacity="0.55"/>
        <ellipse cx="156" cy="126" rx="9" ry="5" fill="var(--rose)" opacity="0.55"/>
        <!-- bow -->
        <g transform="translate(120 34)">
          <path d="M0 0c-8-12-24-14-30-4-5 9 2 20 14 22 6 1 12-2 16-6Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="2.2"/>
          <path d="M0 0c8-12 24-14 30-4 5 9-2 20-14 22-6 1-12-2-16-6Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="2.2"/>
          <circle cx="0" cy="4" r="6" fill="var(--gold)" stroke="var(--ink)" stroke-width="2.2"/>
        </g>
      </svg>
    </div>
    <p class="prose" data-line>${PILLOW.lines[0]}</p>
  `);

  const line = node.querySelector<HTMLElement>('[data-line]');
  const shape = node.querySelector<HTMLElement>('.pillow-art__shape');

  const actions = el('div', 'scene-actions');
  actions.append(
    actionButton('squeeze it', () => {
      index = (index + 1) % PILLOW.lines.length;
      if (line) line.textContent = PILLOW.lines[index] ?? '';
      if (shape) {
        shape.classList.remove('is-hugged');
        void shape.getBoundingClientRect();
        shape.classList.add('is-hugged');
      }
    }, 'primary'),
    actionButton('close', () => handle.close(), 'ghost'),
  );
  node.append(actions);
  handle.body.append(node);
}
