import { GIF_NOTE } from '../copy';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el } from './ui';

const BASE = import.meta.env.BASE_URL;

export function gifScene(handle: SceneHandle): void {
  const node = card(`
    <div class="gif-big">
      <img src="${BASE}assets/gif/patrick.gif" alt="the gif you always send" />
    </div>
    <p class="prose">${GIF_NOTE}</p>
  `);
  const actions = el('div', 'scene-actions');
  actions.append(actionButton('close', () => handle.close(), 'ghost'));
  node.append(actions);
  handle.body.append(node);
}
