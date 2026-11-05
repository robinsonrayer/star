import { BAMBI } from '../copy';
import { markDone } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header } from './ui';

const PRINT = `<svg class="print" viewBox="0 0 390 420" role="img" aria-label="a print of a deer in a forest">
  <defs>
    <linearGradient id="printSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b1b30"/>
      <stop offset="0.55" stop-color="#6c3350"/>
      <stop offset="1" stop-color="#c98695"/>
    </linearGradient>
    <radialGradient id="moonGlow">
      <stop offset="0" stop-color="#f8e8c2" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#f8e8c2" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="8" y="8" width="374" height="404" rx="4" fill="url(#printSky)"/>
  <circle cx="300" cy="96" r="46" fill="url(#moonGlow)"/>
  <circle cx="300" cy="96" r="26" fill="#f8e8c2"/>
  <circle cx="290" cy="90" r="22" fill="#3d2233" opacity="0.55"/>
  <g fill="#fff6df" opacity="0.7">
    ${Array.from({ length: 26 }, (_, i) => {
      const x = (i * 97) % 360 + 14;
      const y = (i * 61) % 240 + 16;
      return `<circle cx="${x}" cy="${y}" r="${i % 4 === 0 ? 1.6 : 0.9}"/>`;
    }).join('')}
  </g>
  <path d="M8 300c40-30 72-16 104-34 30-17 60 4 92-8 34-13 62 2 90-10 32-13 56-2 80 8v156H8Z" fill="#2a1726" opacity="0.75"/>
  <g stroke="#1f1220" stroke-width="3" fill="none" opacity="0.8">
    <path d="M52 330V214M52 250l-16-14M52 260l16-14"/>
    <path d="M100 336V236M100 268l-14-12M100 274l14-12"/>
    <path d="M338 340V222M338 258l-16-14M338 264l16-14"/>
  </g>
  <g stroke="#c98695" stroke-width="1.2" fill="none" opacity="0.5">
    <path d="M30 344V240M30 280l-10-9M30 286l10-9"/>
    <path d="M360 350V248M360 286l-10-9M360 292l10-9"/>
  </g>
  <path d="M8 350c60-22 96 6 140-10 44-16 82 6 128-8 36-11 70 2 106 12v68H8Z" fill="#1b1020" opacity="0.9"/>
  <g fill="#0d070f">
    <!-- body -->
    <ellipse cx="196" cy="304" rx="62" ry="32"/>
    <!-- chest into neck -->
    <path d="M238 298c1-20 11-38 21-48l24 22c-10 8-17 20-19 32Z"/>
    <!-- head -->
    <g transform="rotate(-8 284 246)">
      <ellipse cx="284" cy="246" rx="24" ry="17"/>
      <ellipse cx="305" cy="251" rx="11" ry="8"/>
    </g>
    <!-- ears -->
    <ellipse cx="268" cy="220" rx="6" ry="14" transform="rotate(-34 268 220)"/>
    <ellipse cx="298" cy="216" rx="6" ry="14" transform="rotate(22 298 216)"/>
    <!-- tail -->
    <path d="M136 288c-8-6-16-4-18 2 4 6 12 8 20 6Z"/>
  </g>
  <!-- legs -->
  <g stroke="#0d070f" stroke-width="7" stroke-linecap="round">
    <path d="M158 322v40M192 328v36M236 326v34M264 318v38"/>
  </g>
  <!-- eye -->
  <circle cx="291" cy="243" r="4" fill="#f4d98a"/>
  <g fill="#f4d98a" opacity="0.9">
    <circle cx="120" cy="240" r="3"/><circle cx="140" cy="220" r="2"/>
    <circle cx="180" cy="228" r="2.4"/><circle cx="210" cy="206" r="1.8"/>
  </g>
  <rect x="8" y="8" width="374" height="404" rx="4" fill="none" stroke="#f4d98a" stroke-width="2" opacity="0.8"/>
</svg>`;

export function bambiScene(handle: SceneHandle): void {
  markDone('bambi');
  const node = card(`${header(BAMBI.title, '')}${PRINT}<p class="prose">${BAMBI.body}</p>`);
  const actions = el('div', 'scene-actions');
  actions.append(actionButton('close', () => handle.close(), 'ghost'));
  node.append(actions);
  handle.body.append(node);
}
