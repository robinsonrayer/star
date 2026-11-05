/**
 * Full screen scene layer. One scene at a time, focus trapped, body scroll
 * locked, and the element that opened it gets focus back on close.
 */

let current: { el: HTMLElement; opener: HTMLElement | null; onClose: (() => void) | null } | null =
  null;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export interface SceneHandle {
  el: HTMLElement;
  body: HTMLElement;
  close: () => void;
  label: string;
}

export function openScene(opts: {
  id: string;
  label: string;
  theme?: 'day' | 'dusk';
  onClose?: () => void;
}): SceneHandle {
  const opener = (document.activeElement as HTMLElement | null) ?? null;

  const el = document.createElement('div');
  el.className = 'scene';
  el.dataset.scene = opts.id;
  if (opts.theme === 'dusk') el.classList.add('scene--dusk');
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', opts.label);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'scene__close';
  closeBtn.setAttribute('aria-label', 'close');
  closeBtn.innerHTML = '<span aria-hidden="true">&times;</span>';

  const body = document.createElement('div');
  body.className = 'scene__body';

  el.append(closeBtn, body);
  document.body.append(el);
  document.body.classList.add('is-locked');

  const close = () => {
    if (!current || current.el !== el) return;
    el.classList.add('scene--out');
    window.setTimeout(() => {
      el.remove();
      document.body.classList.remove('is-locked');
      current = null;
      opts.onClose?.();
      if (opener && document.contains(opener)) opener.focus();
    }, 180);
  };

  current = { el, opener, onClose: opts.onClose ?? null };
  closeBtn.addEventListener('click', close);
  el.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (node) => node.offsetParent !== null || node === document.activeElement,
    );
    if (nodes.length === 0) return;
    const first = nodes[0]!;
    const last = nodes[nodes.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  requestAnimationFrame(() => el.classList.add('scene--in'));
  window.setTimeout(() => closeBtn.focus({ preventScroll: true }), 60);

  return { el, body, close, label: opts.label };
}

export function closeCurrent(): void {
  current?.el.querySelector<HTMLButtonElement>('.scene__close')?.click();
}

export function sceneOpen(): boolean {
  return current !== null;
}
