import type { SceneHandle } from '../overlay';

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function reduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function actionButton(
  label: string,
  onClick: () => void,
  variant: 'primary' | 'ghost' = 'primary',
): HTMLButtonElement {
  const button = el('button', `btn btn--${variant}`, label);
  button.type = 'button';
  button.addEventListener('click', onClick);
  return button;
}

export function header(title: string, intro?: string): string {
  return `<header class="scene-head">
    <h2 class="scene-title">${title}</h2>
    ${intro ? `<p class="scene-intro">${intro}</p>` : ''}
  </header>`;
}

export function card(html: string): HTMLElement {
  const node = el('div', 'scene-card');
  node.innerHTML = html;
  return node;
}

export function reveal(host: HTMLElement, delay = 0): void {
  if (reduced()) return;
  host.style.setProperty('--delay', `${delay}ms`);
  host.classList.add('reveal');
}

/** Tiny synthesised squeak, so the plush does not need an audio file. */
export function squeak(): void {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.26);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
    osc.addEventListener('ended', () => void ctx.close());
  } catch {
    /* audio is a bonus, silence is allowed */
  }
}

export function finishAndClose(handle: SceneHandle, label = 'close'): HTMLElement {
  const row = el('div', 'scene-actions');
  row.append(actionButton(label, () => handle.close(), 'ghost'));
  return row;
}
