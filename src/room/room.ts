import { HOTSPOTS, ROOM_HINT } from '../copy';
import { data, isDone, type SceneId } from '../state';
import { WALL_PHOTOS } from '../photos';
import * as art from './art-room';
import * as props from './art-props';
import { openSceneById } from '../scenes';

interface HotspotSpec {
  id: SceneId;
  x: number;
  y: number;
  w: number;
  h: number;
}

const HOTSPOT_BOXES: HotspotSpec[] = [
  { id: 'window', x: 236, y: 56, w: 146, h: 204 },
  { id: 'vanity', x: 26, y: 232, w: 150, h: 278 },
  { id: 'shelf', x: 22, y: 486, w: 120, h: 214 },
  { id: 'bambi', x: 148, y: 492, w: 76, h: 94 },
  { id: 'record', x: 210, y: 350, w: 94, h: 50 },
  { id: 'cupcake', x: 308, y: 386, w: 48, h: 56 },
  { id: 'laptop', x: 304, y: 532, w: 68, h: 64 },
  { id: 'gif', x: 244, y: 272, w: 52, h: 54 },
  { id: 'door', x: 266, y: 700, w: 116, h: 180 },
  { id: 'plush', x: 116, y: 678, w: 82, h: 80 },
  { id: 'pillow', x: 16, y: 696, w: 78, h: 68 },
];

const ASSET_BASE = import.meta.env.BASE_URL;

function pct(value: number, total: number): string {
  return `${(value / total) * 100}%`;
}

function constellationLines(): string {
  if (!data.night) return '';
  const stars: [number, number][] = [
    [290, 130],
    [322, 146],
    [332, 186],
    [300, 202],
    [282, 168],
  ];
  const path = stars.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ') + ' Z';
  return `<g class="constellation" clip-path="url(#winClip)" aria-hidden="true">
    <path d="${path}" fill="none" stroke="#f4d98a" stroke-width="1.2" opacity="0.9"/>
    ${stars
      .map(
        ([x, y], i) =>
          `<circle cx="${x}" cy="${y}" r="${i === 0 ? 3 : 2.2}" fill="#fff4cf"/>
           <circle cx="${x}" cy="${y}" r="6" fill="url(#bulbGlow)" opacity="0.5"/>`,
      )
      .join('')}
  </g>`;
}

function buildSvg(): string {
  const playing = isDone('record');
  const cupcake =
    data.cupcake.base !== null && data.cupcake.frosting !== null && data.cupcake.topping !== null;
  return `<svg class="room-svg" viewBox="0 0 390 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    ${art.defs()}
    ${art.wall()}
    ${art.windowFrame()}
    ${constellationLines()}
    ${props.gifFrame(`${ASSET_BASE}assets/gif/patrick.gif`)}
    ${props.lamp()}
    ${props.polaroids(isDone('vanity'), WALL_PHOTOS)}
    ${art.vanity()}
    ${art.dresser()}
    ${props.recordPlayer(playing)}
    ${props.cakeStand(cupcake)}
    ${art.shelf()}
    ${props.bambiPrint()}
    ${art.desk()}
    ${props.laptop()}
    ${props.stickers()}
    ${art.bed()}
    ${props.pillow()}
    ${props.plush()}
    ${art.door()}
    ${art.rug()}
    ${art.vignette()}
  </svg>`;
}

function buildHotspots(): string {
  return HOTSPOT_BOXES.map((box) => {
    const copy = HOTSPOTS[box.id]!;
    const done = isDone(box.id);
    const label = copy.label ? `<span class="hotspot__label">${copy.label}</span>` : '';
    return `<button
      type="button"
      class="hotspot${done ? ' is-done' : ''}${box.id === 'gif' ? ' hotspot--quiet' : ''}"
      data-scene="${box.id}"
      data-hotspot="${box.id}"
      aria-label="${copy.aria}"
      style="left:${pct(box.x, 390)};top:${pct(box.y, 900)};width:${pct(box.w, 390)};height:${pct(box.h, 900)}"
    ><span class="hotspot__dot" aria-hidden="true"></span>${label}</button>`;
  }).join('');
}

export function mountRoom(root: HTMLElement): void {
  root.innerHTML = `<div class="room${data.night ? ' is-night' : ''}">
    <div class="room__frame${data.night ? ' is-night' : ''}">
      ${buildSvg()}
      <div class="room__hotspots">${buildHotspots()}</div>
    </div>
    <p class="room__hint" aria-hidden="true">${ROOM_HINT}</p>
  </div>`;

  const frame = root.querySelector<HTMLElement>('.room__frame');
  const hotspots = root.querySelector<HTMLElement>('.room__hotspots');
  if (!frame || !hotspots) return;

  hotspots.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-scene]');
    if (!target) return;
    const id = target.dataset.scene as SceneId | undefined;
    if (!id) return;
    openSceneById(id, {
      onClose: () => {
        const night = data.night;
        mountRoom(root);
        const again = root.querySelector<HTMLButtonElement>(`[data-hotspot="${id}"]`);
        if (again) {
          again.focus({ preventScroll: true });
          if (night) root.querySelector('.room__frame')?.classList.add('is-night');
        }
      },
    });
  });

  // First visit: pulse the dots once, then stop nagging.
  frame.classList.add('is-live');
}
