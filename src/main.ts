import './style.css';
import { APP_TITLE } from './copy';
import { data, save } from './state';
import { mountRoom } from './room/room';
import { runGate } from './gate';

const found = document.getElementById('app');
if (!found) throw new Error('no app element');
const app: HTMLElement = found;

document.title = APP_TITLE;

const params = new URLSearchParams(window.location.search);
/** ?peek skips the gate for review. Never linked from the page. */
const peek = params.has('peek');

function enter(): void {
  app.innerHTML = '';
  mountRoom(app);
}

if (data.entered || peek) {
  enter();
} else {
  runGate(app, () => {
    data.entered = true;
    save();
    enter();
  });
}
