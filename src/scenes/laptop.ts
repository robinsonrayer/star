import { LAPTOP } from '../copy';
import { markDone } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header, reduced } from './ui';

export function laptopScene(handle: SceneHandle): void {
  markDone('laptop');

  const node = card(`
    ${header(LAPTOP.title, '')}
    <div class="terminal" aria-live="polite">
      <div class="terminal__bar" aria-hidden="true"><i></i><i></i><i></i></div>
      <pre class="terminal__screen" data-screen></pre>
    </div>
    <p class="prose terminal__after" data-after hidden>${LAPTOP.after}</p>
  `);

  const screen = node.querySelector<HTMLElement>('[data-screen]');
  const after = node.querySelector<HTMLElement>('[data-after]');
  const actions = el('div', 'scene-actions');
  actions.append(actionButton('close', () => handle.close(), 'ghost'));
  node.append(actions);
  handle.body.append(node);

  const lines = LAPTOP.lines;
  if (reduced() || !screen) {
    if (screen) screen.textContent = lines.join('\n');
    if (after) after.hidden = false;
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;

  const tick = (): void => {
    if (!handle.el.isConnected) return;
    const line = lines[lineIndex] ?? '';
    if (charIndex <= line.length) {
      const done = lines.slice(0, lineIndex);
      screen.textContent = [...done, line.slice(0, charIndex)].join('\n');
      charIndex += 1;
      window.setTimeout(tick, 28);
      return;
    }
    lineIndex += 1;
    charIndex = 0;
    if (lineIndex < lines.length) {
      window.setTimeout(tick, 420);
      return;
    }
    if (after) {
      after.hidden = false;
      after.classList.add('fade-up');
    }
  };

  tick();
}
