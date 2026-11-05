import { SHELF } from '../copy';
import { markDone } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header } from './ui';

export function shelfScene(handle: SceneHandle): void {
  const list = (): void => {
    handle.body.innerHTML = '';
    const node = card(`
      ${header(SHELF.title, SHELF.intro)}
      <ul class="spines">
        ${SHELF.volumes
          .map(
            (volume, i) =>
              `<li><button type="button" class="spine" data-volume="${i}">
                <span class="spine__num">${volume.spine}</span>
                <span class="spine__title">${volume.title}</span>
              </button></li>`,
          )
          .join('')}
        <li><button type="button" class="spine spine--blank" data-volume="blank">
          <span class="spine__num">${SHELF.blank.spine}</span>
          <span class="spine__title">${SHELF.blank.title}</span>
        </button></li>
      </ul>
    `);
    handle.body.append(node);

    node.querySelectorAll<HTMLButtonElement>('[data-volume]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.volume;
        if (key === 'blank') showBlank();
        else if (key !== undefined) showVolume(Number(key));
      });
    });
  };

  const back = (): HTMLButtonElement => actionButton(SHELF.back, list, 'ghost');

  const showVolume = (index: number): void => {
    const volume = SHELF.volumes[index];
    if (!volume) return;
    markDone('shelf');
    handle.body.innerHTML = '';
    const node = card(`
      ${header(volume.title, volume.spine)}
      <div class="manga" role="group" aria-label="${volume.title}">
        ${volume.panels
          .map(
            (panel, i) => `<figure class="panel">
              <span class="panel__num" aria-hidden="true">${i + 1}</span>
              <p>${panel}</p>
            </figure>`,
          )
          .reverse()
          .join('')}
      </div>
    `);
    const actions = el('div', 'scene-actions');
    actions.append(back());
    node.append(actions);
    handle.body.append(node);
    handle.body.querySelector<HTMLButtonElement>('.btn')?.focus();
  };

  const showBlank = (): void => {
    markDone('shelf');
    handle.body.innerHTML = '';
    const node = card(`
      ${header(SHELF.blank.title, SHELF.blank.spine)}
      <p class="prose">${SHELF.blank.body}</p>
    `);
    const actions = el('div', 'scene-actions');
    actions.append(back());
    node.append(actions);
    handle.body.append(node);
  };

  list();
}
