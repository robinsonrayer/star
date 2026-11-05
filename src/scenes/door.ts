import { DOOR, FINAL_TRACK_URL, PLAYLIST_URL, VOICE_NOTE } from '../copy';
import { markDone, visitedCount } from '../state';
import type { SceneHandle } from '../overlay';
import { mountPlayer } from '../audio';
import { actionButton, card, el, header } from './ui';

const BASE = import.meta.env.BASE_URL;

export function doorScene(handle: SceneHandle): void {
  markDone('door');

  const node = card(`
    ${header(DOOR.title, DOOR.intro)}
    ${visitedCount() < 3 ? `<p class="whisper">${DOOR.earlyLine}</p>` : ''}
    <div class="letter" aria-label="letter">
      ${DOOR.letter
        .map((line, i) => `<p class="letter__line" style="--i:${i}">${line}</p>`)
        .join('')}
      <p class="letter__sign" style="--i:${DOOR.letter.length}">${DOOR.from}</p>
      <p class="letter__name" style="--i:${DOOR.letter.length + 1}">${DOOR.signoff}</p>
    </div>
    <div class="voice" hidden>
      <p class="voice__label">${DOOR.voiceTitle}</p>
      <audio class="voice__audio" controls preload="metadata" src="${BASE}${VOICE_NOTE}"></audio>
    </div>
    <div class="song"></div>
  `);

  const audio = node.querySelector<HTMLAudioElement>('.voice__audio');
  const voiceBox = node.querySelector<HTMLElement>('.voice');
  if (audio) {
    // Only reveal the player once there is a real recording to play.
    const reveal = (): void => {
      if (!voiceBox) return;
      const ready = Number.isFinite(audio.duration) && audio.duration > 0.5;
      voiceBox.hidden = !ready;
    };
    audio.addEventListener('loadedmetadata', reveal);
    audio.addEventListener('durationchange', reveal);
    audio.addEventListener('error', () => {
      if (voiceBox) voiceBox.hidden = true;
    });
    audio.load();
  }

  const actions = el('div', 'scene-actions');
  const songHost = node.querySelector<HTMLElement>('.song');
  const play = (): void => {
    if (!songHost) return;
    songHost.innerHTML = '';
    mountPlayer(songHost, FINAL_TRACK_URL || PLAYLIST_URL);
  };
  const early = visitedCount() < 3;
  if (early) {
    // She has not seen the room yet. Sending her back out is the kinder default.
    actions.append(
      actionButton(DOOR.earlyGo, () => handle.close(), 'primary'),
      actionButton(DOOR.play, play, 'ghost'),
    );
  } else {
    actions.append(
      actionButton(DOOR.play, play, 'primary'),
      actionButton('stay here', () => handle.close(), 'ghost'),
    );
  }
  node.append(actions);

  handle.body.append(node);
}
