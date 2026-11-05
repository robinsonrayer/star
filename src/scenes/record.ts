import { PLAYLIST_URL, RECORD } from '../copy';
import { data, markDone } from '../state';
import type { SceneHandle } from '../overlay';
import { mountPlayer } from '../audio';
import { actionButton, card, el, header } from './ui';

export function recordScene(handle: SceneHandle): void {
  const node = card(`
    ${header(RECORD.title, data.musicOn ? RECORD.playing : RECORD.idle)}
    <p class="prose">${RECORD.note}</p>
    <div class="player-slot"></div>
    <p class="hint-line">
      <a class="text-link" href="${PLAYLIST_URL}" target="_blank" rel="noreferrer">${RECORD.open}</a>
    </p>
  `);

  const slot = node.querySelector<HTMLElement>('.player-slot');
  const actions = el('div', 'scene-actions');

  if (data.musicOn && slot) {
    mountPlayer(slot, PLAYLIST_URL);
    actions.append(actionButton('close', () => handle.close(), 'ghost'));
  } else {
    const play = actionButton('needle down', () => {
      if (!slot) return;
      data.musicOn = true;
      markDone('record');
      slot.innerHTML = '';
      mountPlayer(slot, PLAYLIST_URL);
      play.remove();
      const title = node.querySelector('.scene-intro');
      if (title) title.textContent = RECORD.playing;
    }, 'primary');
    actions.append(play, actionButton('not now', () => handle.close(), 'ghost'));
  }

  node.append(actions);
  handle.body.append(node);
}
