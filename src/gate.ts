import { GATE_DONE, GATE_INTRO, GATE_STEPS, type GateStep } from './copy';
import { reduced } from './scenes/ui';

const MAX_TRIES = 5;

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function distance(a: string, b: string): number {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]) as number[][];
  for (let j = 0; j <= b.length; j += 1) rows[0]![j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i]![j] = Math.min(rows[i - 1]![j]! + 1, rows[i]![j - 1]! + 1, rows[i - 1]![j - 1]! + cost);
    }
  }
  return rows[a.length]![b.length]!;
}

function accepts(input: string, step: GateStep): boolean {
  const value = normalise(input);
  if (value.length === 0) return false;
  const candidates = [step.answer, ...(step.also ?? [])].map(normalise);
  if (candidates.includes(value)) return true;
  const tolerance = step.answer.length > 10 ? 3 : 2;
  return candidates.some((candidate) => distance(value, candidate) <= tolerance);
}

export function runGate(root: HTMLElement, onEnter: () => void): void {
  let stepIndex = 0;
  let tries = 0;
  let teaseIndex = 0;
  let hintShown = false;

  root.innerHTML = `<section class="gate">
    <div class="gate__glow" aria-hidden="true"></div>
    <div class="gate__inner">
      <p class="gate__kicker">${GATE_INTRO.kicker}</p>
      <h1 class="gate__title">${GATE_INTRO.lines[0]}</h1>
      <p class="gate__sub">${GATE_INTRO.lines[1]}</p>
      <form class="gate__form" novalidate>
        <label class="gate__label" for="answer" data-prompt></label>
        <input
          id="answer"
          name="answer"
          class="gate__input"
          type="text"
          autocomplete="off"
          autocapitalize="none"
          autocorrect="off"
          spellcheck="false"
          enterkeyhint="go"
          placeholder="${GATE_INTRO.placeholder}"
        />
        <p class="gate__hint" data-hint hidden></p>
        <div class="gate__row">
          <button type="submit" class="btn btn--primary">${GATE_INTRO.submit}</button>
          <button type="button" class="btn btn--ghost" data-hint-btn>hint</button>
        </div>
      </form>
      <p class="gate__feedback" role="status" aria-live="polite" data-feedback></p>
      <ol class="gate__steps" aria-hidden="true">
        ${GATE_STEPS.map(() => '<li></li>').join('')}
      </ol>
    </div>
  </section>`;

  const form = root.querySelector<HTMLFormElement>('.gate__form');
  const input = root.querySelector<HTMLInputElement>('#answer');
  const promptEl = root.querySelector<HTMLElement>('[data-prompt]');
  const hintEl = root.querySelector<HTMLElement>('[data-hint]');
  const feedback = root.querySelector<HTMLElement>('[data-feedback]');
  const hintBtn = root.querySelector<HTMLButtonElement>('[data-hint-btn]');
  const stepsEl = root.querySelector<HTMLElement>('.gate__steps');
  const titleEl = root.querySelector<HTMLElement>('.gate__title');
  const subEl = root.querySelector<HTMLElement>('.gate__sub');
  const kickerEl = root.querySelector<HTMLElement>('.gate__kicker');

  if (!form || !input || !promptEl || !hintEl || !feedback || !hintBtn || !stepsEl) return;

  const paintSteps = (): void => {
    Array.from(stepsEl.children).forEach((dot, i) => {
      dot.classList.toggle('is-done', i < stepIndex);
      dot.classList.toggle('is-now', i === stepIndex);
    });
  };

  const paintStep = (): void => {
    const step = GATE_STEPS[stepIndex];
    if (!step) return;
    promptEl.textContent = step.prompt;
    hintEl.textContent = step.hint;
    hintEl.hidden = !hintShown;
    input.value = '';
    input.disabled = false;
    feedback.textContent = '';
    feedback.classList.remove('is-wrong', 'is-right');
    paintSteps();
    if (!reduced()) {
      form.classList.remove('gate__form--in');
      void form.offsetWidth;
      form.classList.add('gate__form--in');
    }
    input.focus({ preventScroll: true });
  };

  const done = (): void => {
    root.innerHTML = `<section class="gate gate--done">
      <div class="gate__inner">
        <p class="gate__kicker">${GATE_DONE.line}</p>
        <h1 class="gate__title">${GATE_DONE.sub}</h1>
        <button type="button" class="btn btn--primary" data-enter>come in</button>
      </div>
    </section>`;
    const enter = root.querySelector<HTMLButtonElement>('[data-enter]');
    enter?.focus();
    enter?.addEventListener('click', onEnter);
    if (kickerEl) kickerEl.textContent = '';
    if (titleEl) titleEl.textContent = '';
    if (subEl) subEl.textContent = '';
  };

  const wrong = (): void => {
    const step = GATE_STEPS[stepIndex];
    if (!step) return;
    tries += 1;
    const tease = step.tease[teaseIndex % step.tease.length] ?? '';
    teaseIndex += 1;
    feedback.textContent = tease;
    feedback.classList.add('is-wrong');
    input.value = '';
    if (!reduced()) {
      form.classList.remove('is-shake');
      void form.offsetWidth;
      form.classList.add('is-shake');
    }
    if (tries >= MAX_TRIES && !root.querySelector('[data-mercy]')) {
      const mercy = document.createElement('button');
      mercy.type = 'button';
      mercy.className = 'text-link gate__mercy';
      mercy.dataset.mercy = 'true';
      mercy.textContent = GATE_DONE.mercy;
      mercy.addEventListener('click', () => done());
      feedback.after(mercy);
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const step = GATE_STEPS[stepIndex];
    if (!step) return;
    if (!accepts(input.value, step)) {
      wrong();
      return;
    }
    feedback.classList.add('is-right');
    feedback.textContent = 'yes.';
    stepIndex += 1;
    tries = 0;
    teaseIndex = 0;
    hintShown = false;
    paintSteps();
    if (stepIndex >= GATE_STEPS.length) {
      window.setTimeout(done, reduced() ? 0 : 420);
      return;
    }
    window.setTimeout(paintStep, reduced() ? 0 : 380);
  });

  hintBtn.addEventListener('click', () => {
    hintShown = true;
    hintEl.hidden = false;
    feedback.textContent = '';
  });

  paintStep();
}
