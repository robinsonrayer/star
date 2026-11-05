/** Loose props: things on the wall, things on the furniture. */

export function lamp(): string {
  return `<g id="lamp">
    <path d="M196 10v34" stroke="var(--ink)" stroke-width="2"/>
    <ellipse cx="196" cy="44" rx="7" ry="4" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.1"/>
    <path d="M168 84c2-22 9-36 28-36s26 14 28 36Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.8"/>
    <path d="M168 84c8 5 48 5 56 0" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <path d="M170 74c10 4 42 4 52 0" fill="none" stroke="var(--rose-deep)" stroke-width="1" opacity="0.5"/>
    <circle cx="196" cy="88" r="22" fill="url(#bulbGlow)"/>
    <circle cx="196" cy="86" r="4" fill="#ffeab4" stroke="var(--ink)" stroke-width="1"/>
  </g>`;
}

/* ---------------------------------------------------------------- polaroids */

type Motif = (x: number, y: number) => string;

const heart: Motif = (x, y) => `<g transform="translate(${x} ${y})" fill="var(--rose-deep)" opacity="0.8">
  <path d="M6 7c1.2-1.7 3.8-1 3.8 1 0 1.6-1.9 2.7-3.8 4.4C4.1 10.7 2.2 9.6 2.2 8c0-2 2.6-2.7 3.8-1Z"/>
  <path d="M18 14c1-1.4 3.2-.8 3.2.9 0 1.4-1.6 2.3-3.2 3.7-1.6-1.4-3.2-2.3-3.2-3.7 0-1.7 2.2-2.3 3.2-.9Z"/>
  <path d="M8 24c1.2-1.7 3.8-1 3.8 1 0 1.6-1.9 2.7-3.8 4.4-1.9-1.7-3.8-2.8-3.8-4.4 0-2 2.6-2.7 3.8-1Z"/>
</g>`;

const cassette: Motif = (x, y) => `<g transform="translate(${x} ${y})" stroke="var(--ink)" stroke-width="1">
  <rect x="3" y="9" width="30" height="21" rx="3" fill="var(--gold-light)"/>
  <rect x="7" y="12" width="22" height="8" rx="2" fill="var(--cream)"/>
  <circle cx="12" cy="16" r="2" fill="var(--ink)"/><circle cx="24" cy="16" r="2" fill="var(--ink)"/>
  <path d="M7 25h22"/>
</g>`;

const cupcake: Motif = (x, y) => `<g transform="translate(${x} ${y})" stroke="var(--ink)" stroke-width="1">
  <path d="M8 20h16l-2 11H10Z" fill="var(--rose)"/>
  <path d="M9 20c1-6 4-9 7-9s6 3 7 9Z" fill="var(--cream)"/>
  <circle cx="16" cy="10" r="2.4" fill="var(--gold)"/>
</g>`;

const moon: Motif = (x, y) => `<g transform="translate(${x} ${y})">
  <circle cx="26" cy="16" r="8" fill="#f8e8c2" stroke="var(--ink)" stroke-width="0.8"/>
  <circle cx="22.5" cy="13.5" r="7" fill="var(--wall-3)"/>
  <g fill="var(--gold)">
    <circle cx="9" cy="9" r="1.1"/><circle cx="14" cy="21" r="1.4"/><circle cx="31" cy="30" r="1.1"/>
  </g>
</g>`;

const cat: Motif = (x, y) => `<g transform="translate(${x} ${y})" stroke="var(--ink)" stroke-width="1" fill="var(--cream)">
  <path d="M8 32c0-9 5-15 14-15s14 6 14 15Z"/>
  <path d="M10 22l1-7 6 4M34 22l-1-7-6 4" fill="var(--rose)"/>
  <circle cx="17" cy="26" r="1.1" fill="var(--ink)"/><circle cx="27" cy="26" r="1.1" fill="var(--ink)"/>
  <path d="M20 29h4" stroke-width="1.2"/>
  <path d="M22 24l-1.6 3h3.2Z" fill="var(--gold)" stroke="none"/>
</g>`;

const MOTIFS: Motif[] = [heart, cassette, cupcake, moon, cat];

function polaroid(x: number, y: number, rot: number, i: number): string {
  const motif = MOTIFS[i % MOTIFS.length]!;
  return `<g transform="rotate(${rot} ${x + 27} ${y + 30})">
    <rect x="${x}" y="${y}" width="54" height="60" rx="2" fill="#fffdf9" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="${x + 5}" y="${y + 5}" width="44" height="40" fill="var(--photo-${i % 3})"/>
    <g clip-path="none">${motif(x + 5, y + 5)}</g>
    <rect x="${x + 5}" y="${y + 5}" width="44" height="40" fill="none" stroke="var(--ink)" stroke-width="0.6" opacity="0.35"/>
    <path d="M${x + 8} ${y + 52}h28" stroke="var(--rose)" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>
    <circle cx="${x + 47}" cy="${y + 9}" r="2.4" fill="none" stroke="var(--gold)" stroke-width="1.2"/>
  </g>`;
}

export function polaroids(extraCard: boolean): string {
  return `<g id="polaroids">
    ${polaroid(52, 104, -7, 0)}
    ${polaroid(112, 92, 5, 1)}
    ${polaroid(58, 172, 4, 2)}
    ${polaroid(118, 168, -4, 3)}
    <circle cx="156" cy="100" r="2.8" fill="var(--gold)" opacity="0.8"/>
    ${extraCard ? lookCard(178, 150) : ''}
  </g>`;
}

export function lookCard(x: number, y: number): string {
  return `<g transform="rotate(6 ${x + 24} ${y + 30})">
    <rect x="${x}" y="${y}" width="48" height="58" rx="2" fill="#fffdf9" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="${x + 4}" y="${y + 4}" width="40" height="32" fill="var(--rose)" opacity="0.2"/>
    ${Array.from({ length: 8 })
      .map(
        (_, i) =>
          `<circle cx="${x + 9 + (i % 4) * 10}" cy="${y + 12 + Math.floor(i / 4) * 11}" r="3.2" fill="var(--rose-deep)" stroke="var(--ink)" stroke-width="0.8"/>`,
      )
      .join('')}
    <path d="M${x + 7} ${y + 48}h24" stroke="var(--gold)" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
}

/* -------------------------------------------------------------------- bambi */

export function bambiPrint(): string {
  return `<g id="bambi">
    <rect x="148" y="490" width="78" height="96" rx="2" fill="var(--cream)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="154" y="496" width="66" height="78" fill="var(--wall-3)"/>
    <circle cx="164" cy="508" r="5.5" fill="#f8e8c2"/>
    <path d="M154 546c9-7 17-3 25-9 8-5 16 0 24-4 6-3 12-1 17 2v29h-66Z" fill="var(--rose-deep)" opacity="0.32"/>
    <g transform="translate(160 520) scale(1.55)" fill="#7b3049">
      <ellipse cx="16" cy="22" rx="11.5" ry="7"/>
      <path d="M23 19q4-4 5-8l6 1q-1 5-3 9Z"/>
      <ellipse cx="34" cy="8" rx="6.4" ry="4.8" transform="rotate(-10 34 8)"/>
      <ellipse cx="29.5" cy="2" rx="2" ry="4.6" transform="rotate(-26 29.5 2)"/>
      <ellipse cx="37.5" cy="1" rx="1.8" ry="4.2" transform="rotate(16 37.5 1)"/>
      <rect x="7" y="27" width="1.8" height="9" rx="0.9"/>
      <rect x="11.5" y="27" width="1.8" height="9" rx="0.9"/>
      <rect x="20" y="27" width="1.8" height="9" rx="0.9"/>
      <rect x="24" y="26" width="1.8" height="9" rx="0.9"/>
      <circle cx="4.5" cy="19.5" r="2.2"/>
      <circle cx="36" cy="7.6" r="1" fill="#f8e8c2"/>
      <circle cx="41" cy="9.4" r="1.1" fill="#f8e8c2"/>
    </g>
    <path d="M156 578h62" stroke="var(--gold)" stroke-width="1.3"/>
  </g>`;
}

/* ---------------------------------------------------------------------- gif */

export function gifFrame(href: string): string {
  return `<g id="gif">
    <rect x="244" y="272" width="52" height="54" rx="3" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.7"/>
    <rect x="248" y="276" width="44" height="46" fill="var(--cream)"/>
    <image href="${href}" x="248" y="276" width="44" height="46" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="292" cy="274" r="2.4" fill="var(--gold)" stroke="var(--ink)" stroke-width="0.8"/>
  </g>`;
}

/* ------------------------------------------------------------------- record */

export function recordPlayer(playing: boolean): string {
  return `<g id="record" class="${playing ? 'is-playing' : ''}">
    <rect x="210" y="350" width="94" height="50" rx="4" fill="var(--rose-deep)" stroke="var(--ink)" stroke-width="1.8"/>
    <path d="M210 356h94" stroke="var(--gold)" stroke-width="1.2" opacity="0.6"/>
    <rect x="215" y="358" width="84" height="37" rx="3" fill="#3b2b2e" opacity="0.5"/>
    <g class="vinyl">
      <circle cx="248" cy="376" r="18" fill="#241a1c" stroke="var(--ink)" stroke-width="1.1"/>
      <circle cx="248" cy="376" r="12.5" fill="none" stroke="#6b5b5e" stroke-width="0.6" opacity="0.8"/>
      <circle cx="248" cy="376" r="7.5" fill="none" stroke="#6b5b5e" stroke-width="0.6" opacity="0.8"/>
      <circle cx="248" cy="376" r="5" fill="var(--gold)" stroke="var(--ink)" stroke-width="0.9"/>
    </g>
    <path d="M284 359l-14 10v9" fill="none" stroke="var(--gold)" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="284" cy="359" r="3" fill="var(--cream)" stroke="var(--ink)" stroke-width="0.9"/>
    <circle cx="220" cy="392" r="2" fill="var(--gold)"/>
  </g>`;
}

/* ----------------------------------------------------------------- cupcake */

export function cakeStand(cupcake: boolean): string {
  return `<g id="cupcake">
    <path d="M334 402v32" stroke="var(--gold)" stroke-width="1.6"/>
    <ellipse cx="334" cy="402" rx="20" ry="4.6" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.1"/>
    <ellipse cx="334" cy="434" rx="11" ry="3" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1"/>
    ${
      cupcake
        ? `<g transform="translate(322 365) scale(1.6)">
            <path d="M1 14h16l-2 9H3Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.1"/>
            <path d="M2 14c1-6 3-8 7-8s6 2 7 8Z" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.1"/>
            <circle cx="9" cy="4" r="2.6" fill="var(--gold)" stroke="var(--ink)" stroke-width="0.8"/>
          </g>`
        : ''
    }
  </g>`;
}

/* ------------------------------------------------------------------- plush */

export function plush(): string {
  return `<g id="plush">
    <ellipse cx="150" cy="750" rx="30" ry="6" fill="#6b3a45" opacity="0.14"/>
    <path d="M130 736c-2-14 5-24 16-26 8-1 13 3 15 9" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.8"/>
    <ellipse cx="146" cy="722" rx="21" ry="17" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.8"/>
    <g stroke="var(--ink)" stroke-width="1.5" fill="var(--cream)">
      <rect x="132" y="732" width="6" height="14" rx="3"/>
      <rect x="142" y="734" width="6" height="12" rx="3"/>
      <rect x="152" y="732" width="6" height="14" rx="3"/>
      <rect x="160" y="730" width="6" height="16" rx="3"/>
    </g>
    <circle cx="158" cy="700" r="14" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.8"/>
    <path d="M170 690l7-15 3 17" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.3"/>
    <path d="M168 688c6 3 9 8 9 14" fill="none" stroke="var(--rose)" stroke-width="2.6"/>
    <path d="M148 690c-4 4-5 10-4 15" fill="none" stroke="var(--rose)" stroke-width="2.6"/>
    <circle cx="163" cy="699" r="1.5" fill="var(--ink)"/>
    <circle cx="154" cy="701" r="1.3" fill="var(--ink)"/>
    <path d="M157 705c1.4 1 2.8 1 4.2 0" fill="none" stroke="var(--ink)" stroke-width="1"/>
    <ellipse cx="149" cy="706" rx="3" ry="1.8" fill="var(--rose)" opacity="0.65"/>
    <path d="M128 726c-7 3-9 9-7 15" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
  </g>`;
}

/* ------------------------------------------------------------------ pillow */

export function pillow(): string {
  return `<g id="pillow">
    <rect x="18" y="700" width="76" height="62" rx="12" fill="#fffdf9" stroke="var(--ink)" stroke-width="1.7"/>
    <path d="M18 716c12 8 64 8 76 0" fill="none" stroke="var(--rose)" stroke-width="1.4" opacity="0.5"/>
    <g fill="var(--ink)">
      <ellipse cx="43" cy="730" rx="2.6" ry="3.4"/>
      <ellipse cx="69" cy="730" rx="2.6" ry="3.4"/>
    </g>
    <ellipse cx="56" cy="738" rx="3" ry="2.2" fill="var(--gold)" stroke="var(--ink)" stroke-width="0.8"/>
    <g stroke="var(--ink)" stroke-width="0.9" opacity="0.7">
      <path d="M32 736h8M32 740h8M72 736h8M72 740h8"/>
    </g>
    <g transform="translate(58 706)">
      <path d="M0 6c3-5 6-5 9 0-3 5-6 5-9 0Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.1"/>
      <circle cx="4.5" cy="6" r="1.6" fill="var(--rose-deep)"/>
    </g>
    <path d="M26 750c10 4 40 4 50 0" fill="none" stroke="var(--rose)" stroke-width="1.6" opacity="0.45"/>
  </g>`;
}

/* ------------------------------------------------------------------ laptop */

export function laptop(): string {
  return `<g id="laptop">
    <ellipse cx="336" cy="596" rx="38" ry="4" fill="#6b3a45" opacity="0.13"/>
    <rect x="304" y="586" width="64" height="8" rx="2" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.3"/>
    <g transform="translate(306 536)">
      <rect x="0" y="0" width="60" height="50" rx="4" fill="#3b2b2e" stroke="var(--ink)" stroke-width="1.5"/>
      <rect x="3" y="3" width="54" height="42" rx="2" fill="#2a1e22"/>
      <g fill="#e8ce86" opacity="0.85">
        <rect x="7" y="9" width="24" height="2" rx="1"/>
        <rect x="7" y="15" width="36" height="2" rx="1"/>
        <rect x="7" y="21" width="18" height="2" rx="1"/>
      </g>
      <rect x="7" y="33" width="12" height="2" rx="1" fill="var(--rose)"/>
      <path d="M7 39h3" stroke="var(--gold-light)" stroke-width="2" stroke-linecap="round"/>
    </g>
    <g transform="translate(346 552) rotate(-8)">
      <path d="M0 10c2-7 7-7 9 0-2 7-7 7-9 0Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1"/>
    </g>
  </g>`;
}

export function stickers(): string {
  const items = [
    { x: 312, y: 580, c: 'var(--gold)' },
    { x: 322, y: 581, c: 'var(--rose)' },
    { x: 332, y: 580, c: 'var(--cream)' },
    { x: 342, y: 581, c: 'var(--rose-deep)' },
    { x: 352, y: 580, c: 'var(--gold)' },
  ];
  return `<g id="stickers">
    ${items
      .map(
        (item) =>
          `<circle cx="${item.x}" cy="${item.y}" r="2.8" fill="${item.c}" stroke="var(--ink)" stroke-width="0.8"/>`,
      )
      .join('')}
  </g>`;
}
