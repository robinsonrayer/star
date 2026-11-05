import { CUPCAKE } from '../copy';
import { data, markDone, save } from '../state';
import type { SceneHandle } from '../overlay';
import { actionButton, card, el, header } from './ui';

type Step = 'base' | 'frosting' | 'topping' | 'done';

function stepOf(): Step {
  if (!data.cupcake.base) return 'base';
  if (!data.cupcake.frosting) return 'frosting';
  if (!data.cupcake.topping) return 'topping';
  return 'done';
}

function cupcakeArt(): string {
  const baseColors: Record<string, string> = {
    vanilla: '#e8c99b',
    chocolate: '#6d4030',
    'red velvet': '#8f2036',
  };
  const frostingColors: Record<string, string> = {
    strawberry: '#e79aae',
    cream: '#fdf6ee',
    'pink buttercream': '#f3c3cf',
  };
  const base = data.cupcake.base ? baseColors[data.cupcake.base] ?? '#e8c99b' : '#f0e2d2';
  const frosting = data.cupcake.frosting ? frostingColors[data.cupcake.frosting] ?? '#fdf6ee' : '#f7ebdd';
  const topping = data.cupcake.topping;
  return `<svg class="cupcake-art" viewBox="56 42 88 150" aria-hidden="true">
    <ellipse cx="100" cy="176" rx="54" ry="8" fill="#6b3a45" opacity="0.14"/>
    <path d="M64 108h72l-10 56a10 10 0 0 1-10 8H84a10 10 0 0 1-10-8Z" fill="${base}" stroke="var(--ink)" stroke-width="2.4"/>
    <g stroke="var(--ink)" stroke-width="1.2" opacity="0.25">
      <path d="M80 114l-4 50M96 114l-2 54M112 114l2 50M126 114l4 42"/>
    </g>
    <path d="M62 110c2-16 16-26 38-26s36 10 38 26c2 14-20 10-38 10s-40 4-38-10Z" fill="${frosting}" stroke="var(--ink)" stroke-width="2.4"/>
    <path d="M74 96c6-14 14-20 26-20s20 6 26 20Z" fill="#fffdf9" opacity="0.5"/>
    ${topping === 'a cherry' ? '<circle cx="100" cy="66" r="9" fill="#b3455e" stroke="var(--ink)" stroke-width="2"/><path d="M100 57c2-8 6-12 12-14" fill="none" stroke="var(--ink)" stroke-width="2"/>' : ''}
    ${topping === 'gold flakes' ? '<g fill="var(--gold)" stroke="var(--ink)" stroke-width="0.6"><path d="M84 74l6 4-6 4-4-4Z"/><path d="M108 68l6 4-6 4-4-4Z"/><path d="M98 82l5 3-5 3-3-3Z"/><path d="M118 82l5 3-5 3-3-3Z"/></g>' : ''}
    ${topping === 'a tiny star' ? '<path d="M100 58l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z" fill="var(--gold)" stroke="var(--ink)" stroke-width="1.6"/>' : ''}
  </svg>`;
}

export function cupcakeScene(handle: SceneHandle): void {
  const render = (): void => {
    const step = stepOf();
    handle.body.innerHTML = '';
    const list =
      step === 'base' ? CUPCAKE.bases : step === 'frosting' ? CUPCAKE.frostings : step === 'topping' ? CUPCAKE.toppings : [];

    const node = card(`
      ${header(CUPCAKE.title, step === 'done' ? CUPCAKE.doneTitle : CUPCAKE.intro)}
      ${cupcakeArt()}
      ${
        step === 'done'
          ? `<p class="prose">${[data.cupcake.base, data.cupcake.frosting, data.cupcake.topping]
              .map((choice) => (choice ? CUPCAKE.lines[choice] ?? '' : ''))
              .filter(Boolean)
              .map((line) => `<span class="cupcake-line">${line}</span>`)
              .join('')}</p>
             <p class="counter">${CUPCAKE.doneNote}</p>`
          : `<ul class="choices">
              ${list
                .map(
                  (option) =>
                    `<li><button type="button" class="choice" data-pick="${option}">${option}</button></li>`,
                )
                .join('')}
            </ul>`
      }
    `);

    const actions = el('div', 'scene-actions');
    if (step === 'done') {
      actions.append(
        actionButton(CUPCAKE.again, () => {
          data.cupcake = { base: null, frosting: null, topping: null };
          save();
          render();
        }, 'primary'),
        actionButton('close', () => handle.close(), 'ghost'),
      );
    } else {
      actions.append(actionButton('close', () => handle.close(), 'ghost'));
    }
    node.append(actions);
    handle.body.append(node);

    node.querySelectorAll<HTMLButtonElement>('[data-pick]').forEach((button) => {
      button.addEventListener('click', () => {
        const pick = button.dataset.pick;
        if (!pick) return;
        if (step === 'base') data.cupcake.base = pick;
        else if (step === 'frosting') data.cupcake.frosting = pick;
        else if (step === 'topping') data.cupcake.topping = pick;
        save();
        if (data.cupcake.base && data.cupcake.frosting && data.cupcake.topping) markDone('cupcake');
        render();
      });
    });
  };

  render();
}
