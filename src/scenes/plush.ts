import { PLUSH } from '../copy';
import { data, markDone, save } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header, squeak } from './ui';

export function plushScene(handle: SceneHandle): void {
  markDone('plush');

  const node = card(`
    ${header(PLUSH.title, '')}
    <div class="plush">
      <svg viewBox="0 0 200 200" aria-hidden="true" class="plush__art">
        <ellipse cx="100" cy="182" rx="52" ry="8" fill="#6b3a45" opacity="0.14"/>
        <!-- back legs -->
        <g fill="var(--cream)" stroke="var(--ink)" stroke-width="3">
          <rect x="66" y="150" width="20" height="30" rx="9"/>
          <rect x="114" y="150" width="20" height="30" rx="9"/>
        </g>
        <!-- tail -->
        <path d="M142 130c12 2 18 10 16 20-8 3-15-1-19-8" fill="var(--rose)" stroke="var(--ink)" stroke-width="3"/>
        <!-- body -->
        <ellipse cx="100" cy="130" rx="44" ry="34" fill="var(--cream)" stroke="var(--ink)" stroke-width="3"/>
        <!-- front legs -->
        <g fill="var(--cream)" stroke="var(--ink)" stroke-width="3">
          <rect x="76" y="156" width="21" height="26" rx="9"/>
          <rect x="103" y="156" width="21" height="26" rx="9"/>
        </g>
        <!-- ears -->
        <g fill="var(--cream)" stroke="var(--ink)" stroke-width="3">
          <path d="M70 46c-8-10-6-22 4-24 8-2 14 6 14 16Z"/>
          <path d="M130 46c8-10 6-22-4-24-8-2-14 6-14 16Z"/>
        </g>
        <!-- horn -->
        <path d="M92 40c0-16 6-30 12-38 6 10 8 26 6 40Z" fill="var(--gold)" stroke="var(--ink)" stroke-width="3"/>
        <path d="M97 26h12M99 16h9" stroke="var(--ink)" stroke-width="1.6" opacity="0.5"/>
        <!-- head -->
        <circle cx="100" cy="72" r="38" fill="var(--cream)" stroke="var(--ink)" stroke-width="3"/>
        <!-- mane -->
        <path d="M132 58c10 6 14 18 12 30-2 10-8 16-14 20M68 58c-10 6-14 18-12 30" fill="none" stroke="var(--rose)" stroke-width="7" stroke-linecap="round"/>
        <!-- face -->
        <ellipse cx="86" cy="72" rx="4" ry="5.4" fill="var(--ink)"/>
        <ellipse cx="114" cy="72" rx="4" ry="5.4" fill="var(--ink)"/>
        <circle cx="87.5" cy="70" r="1.4" fill="#fffdf9"/>
        <circle cx="115.5" cy="70" r="1.4" fill="#fffdf9"/>
        <path d="M94 84c4 3 8 3 12 0" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="76" cy="84" rx="6" ry="3.6" fill="var(--rose)" opacity="0.6"/>
        <ellipse cx="124" cy="84" rx="6" ry="3.6" fill="var(--rose)" opacity="0.6"/>
        <!-- belly patch -->
        <ellipse cx="100" cy="136" rx="24" ry="18" fill="#fffdf9" opacity="0.75"/>
      </svg>
    </div>
    <p class="prose" data-line>${PLUSH.lines[data.hugs % PLUSH.lines.length]}</p>
    <p class="counter" data-count>squeezed ${data.hugs === 0 ? 'gently' : `${data.hugs} ${data.hugs === 1 ? 'time' : 'times'}`}</p>
  `);

  const line = node.querySelector<HTMLElement>('[data-line]');
  const count = node.querySelector<HTMLElement>('[data-count]');
  const art = node.querySelector<SVGSVGElement>('.plush__art');

  const squeeze = (): void => {
    data.hugs += 1;
    save();
    squeak();
    if (line) line.textContent = PLUSH.lines[data.hugs % PLUSH.lines.length] ?? '';
    if (count) count.textContent = `squeezed ${data.hugs} ${data.hugs === 1 ? 'time' : 'times'}`;
    if (art) {
      art.classList.remove('is-squeezed');
      void art.getBoundingClientRect();
      art.classList.add('is-squeezed');
    }
  };

  const actions = el('div', 'scene-actions');
  actions.append(actionButton(PLUSH.squeeze, squeeze, 'primary'), actionButton('close', () => handle.close(), 'ghost'));
  node.append(actions);
  handle.body.append(node);
}
