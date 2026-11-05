import { openScene, type SceneHandle } from '../overlay';
import type { SceneId } from '../state';
import { vanityScene } from './vanity';
import { shelfScene } from './shelf';
import { windowScene } from './window';
import { doorScene } from './door';
import { recordScene } from './record';
import { plushScene } from './plush';
import { pillowScene } from './pillow';
import { bambiScene } from './bambi';
import { laptopScene } from './laptop';
import { cupcakeScene } from './cupcake';
import { gifScene } from './gif';

const REGISTRY: Record<SceneId, (handle: SceneHandle) => void> = {
  vanity: vanityScene,
  shelf: shelfScene,
  window: windowScene,
  door: doorScene,
  record: recordScene,
  plush: plushScene,
  pillow: pillowScene,
  bambi: bambiScene,
  laptop: laptopScene,
  cupcake: cupcakeScene,
  gif: gifScene,
};

const LABELS: Record<SceneId, string> = {
  vanity: 'your vanity',
  shelf: 'the shelf',
  window: 'the window',
  door: 'the door',
  record: 'the record player',
  plush: 'the plush',
  pillow: 'huggin pillow',
  bambi: 'the print',
  laptop: 'the laptop',
  cupcake: 'a tiny cake',
  gif: 'a small moving thing',
};

const DUSK: SceneId[] = ['window', 'door'];

export function openSceneById(id: SceneId, opts: { onClose: () => void }): void {
  const handle = openScene({
    id,
    label: LABELS[id],
    theme: DUSK.includes(id) ? 'dusk' : 'day',
    onClose: opts.onClose,
  });
  REGISTRY[id](handle);
}
