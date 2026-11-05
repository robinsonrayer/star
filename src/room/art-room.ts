/**
 * The room, as one elevation. Not a floor plan: a decorated wall with the
 * furniture arranged like a jewellery box, which is the style this reads as.
 * Every fixture is a plain SVG group. Nothing here is interactive; hotspots are
 * HTML buttons laid over the top by room.ts.
 */

export function defs(): string {
  return `<defs>
    <pattern id="wallpaper" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M12 7c1.6 0 2.8 1.3 2.8 2.8 0 1.7-1.6 2.5-2.8 3.9-1.2-1.4-2.8-2.2-2.8-3.9C9.2 8.3 10.4 7 12 7Z" fill="var(--wall-2)"/>
      <circle cx="0" cy="12" r="1" fill="var(--wall-2)"/>
      <circle cx="24" cy="12" r="1" fill="var(--wall-2)"/>
    </pattern>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#241a33"/>
      <stop offset="0.5" stop-color="#5a2c46"/>
      <stop offset="1" stop-color="#c07a8d"/>
    </linearGradient>
    <linearGradient id="mirrorGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fdf7f2"/>
      <stop offset="0.55" stop-color="#ecd6da"/>
      <stop offset="1" stop-color="#d6b6bf"/>
    </linearGradient>
    <linearGradient id="doorGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe6a8" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="gilt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f0d99c"/>
      <stop offset="1" stop-color="#c9a227"/>
    </linearGradient>
    <radialGradient id="bulbGlow">
      <stop offset="0" stop-color="#ffeab4" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#ffeab4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette">
      <stop offset="0.6" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#6b2f42" stop-opacity="0.2"/>
    </radialGradient>
    <clipPath id="winClip"><rect x="250" y="70" width="118" height="174" rx="3"/></clipPath>
  </defs>`;
}

export function wall(): string {
  return `<g id="wall">
    <rect x="0" y="0" width="390" height="900" fill="var(--wall)"/>
    <rect x="0" y="0" width="390" height="788" fill="url(#wallpaper)"/>
    <rect x="0" y="0" width="390" height="12" fill="var(--cream)"/>
    <path d="M0 12h390" stroke="var(--ink)" stroke-width="1.1" opacity="0.35"/>
    <path d="M0 16h390" stroke="var(--gold)" stroke-width="1.4" opacity="0.6"/>
    <rect x="0" y="782" width="390" height="8" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.2"/>
    <path d="M0 782h390" stroke="var(--gold)" stroke-width="1.6" opacity="0.7"/>
    <rect x="0" y="790" width="390" height="110" fill="var(--floor)"/>
    <g stroke="var(--floor-ink)" stroke-width="1" opacity="0.4" fill="none">
      <path d="M0 814h390M0 844h390M0 874h390M0 898h390"/>
      <path d="M52 790v24M146 814v30M284 790v24M92 844v30M228 874v26M336 844v30"/>
    </g>
    <rect x="0" y="790" width="390" height="8" fill="#6b3a45" opacity="0.08"/>
  </g>`;
}

export function rug(): string {
  return `<g id="rug">
    <ellipse cx="112" cy="852" rx="106" ry="30" fill="var(--rose)" opacity="0.4"/>
    <ellipse cx="112" cy="852" rx="106" ry="30" fill="none" stroke="var(--ink)" stroke-width="1" opacity="0.18"/>
    <ellipse cx="112" cy="852" rx="82" ry="20" fill="none" stroke="var(--cream)" stroke-width="2" stroke-dasharray="5 6" opacity="0.45"/>
  </g>`;
}

export function windowFrame(): string {
  return `<g id="window">
    <rect x="240" y="62" width="138" height="196" rx="6" fill="var(--cream)" stroke="var(--ink)" stroke-width="2.2"/>
    <rect x="250" y="70" width="118" height="174" rx="3" fill="url(#sky)"/>
    <g clip-path="url(#winClip)">
      <circle cx="338" cy="108" r="15" fill="#f8e8c2"/>
      <circle cx="331" cy="103" r="13" fill="#3b2138" opacity="0.6"/>
      <g fill="#f8e8c2">
        <circle cx="268" cy="96" r="1.5"/><circle cx="290" cy="126" r="1.1"/>
        <circle cx="312" cy="84" r="1"/><circle cx="356" cy="146" r="1.3"/>
        <circle cx="264" cy="164" r="1.1"/><circle cx="332" cy="174" r="1.5"/>
        <circle cx="302" cy="198" r="1"/><circle cx="352" cy="204" r="1.2"/>
      </g>
      <g stroke="#f8e8c2" stroke-width="0.9" opacity="0.8">
        <path d="M298 104v7M294.5 107.5h7"/>
        <path d="M322 152v5M319.5 154.5h5"/>
      </g>
      <path d="M250 210c14-9 24-5 34-13 12-8 22-3 34-9 14-6 30 2 40-1 6-2 10-1 10 2v55H250Z" fill="#3a1f33" opacity="0.8"/>
      <g fill="#241428" opacity="0.9">
        <rect x="266" y="212" width="7" height="14"/><rect x="278" y="204" width="9" height="22"/>
        <rect x="292" y="214" width="6" height="12"/><rect x="303" y="206" width="10" height="20"/>
        <rect x="318" y="212" width="7" height="14"/><rect x="331" y="202" width="8" height="24"/>
        <rect x="344" y="214" width="9" height="12"/>
      </g>
      <g fill="#ffdc9b" opacity="0.75">
        <rect x="280" y="210" width="2" height="2"/><rect x="306" y="212" width="2" height="2"/>
        <rect x="333" y="208" width="2" height="2"/><rect x="346" y="220" width="2" height="2"/>
      </g>
    </g>
    <path d="M309 70v174M250 157h118" stroke="var(--ink)" stroke-width="2.2" opacity="0.85"/>
    <rect x="250" y="70" width="118" height="174" rx="3" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <rect x="232" y="256" width="154" height="9" rx="4" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.5"/>
    <!-- valance -->
    <path d="M234 52h150v14c-10 9-20 0-29 0s-19 9-28 0-19 9-28 0-19 9-28 0-19 9-28 0Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M234 52h150" stroke="var(--gold)" stroke-width="2"/>
    <ellipse cx="243" cy="150" rx="8" ry="4.6" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.1"/>
    <ellipse cx="375" cy="150" rx="8" ry="4.6" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.1"/>
  </g>`;
}

export function door(): string {
  return `<g id="door">
    <ellipse cx="320" cy="866" rx="72" ry="12" fill="#6b3a45" opacity="0.14"/>
    <rect x="260" y="696" width="122" height="182" rx="4" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.8"/>
    <rect x="267" y="703" width="108" height="175" rx="3" fill="var(--rose-deep)" stroke="var(--ink)" stroke-width="1.6"/>
    <rect x="274" y="711" width="94" height="64" rx="3" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.2"/>
    <rect x="274" y="787" width="94" height="82" rx="3" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.2"/>
    <path d="M274 711h94M274 787h94" stroke="var(--gold)" stroke-width="1.4" opacity="0.7"/>
    <circle cx="283" cy="784" r="3.4" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.2"/>
    <rect x="276" y="730" width="90" height="26" rx="7" fill="url(#gilt)" stroke="var(--ink)" stroke-width="1.3"/>
    <text x="321" y="749" text-anchor="middle" font-family="var(--font-display)" font-style="italic" font-size="17" fill="#3b2b2e">Star</text>
    <path d="M267 862h108v16H267Z" fill="#ffe6a8" opacity="0.5"/>
    <rect x="248" y="872" width="148" height="22" rx="9" fill="url(#doorGlow)" opacity="0.65"/>
    <path d="M252 890h140" stroke="var(--gold)" stroke-width="2" opacity="0.5"/>
  </g>`;
}

export function bed(): string {
  return `<g id="bed">
    <ellipse cx="106" cy="840" rx="100" ry="12" fill="#6b3a45" opacity="0.14"/>
    <rect x="4" y="686" width="152" height="92" rx="12" fill="var(--rose-deep)" stroke="var(--ink)" stroke-width="2"/>
    <path d="M4 700h152M4 714h152M4 728h152M4 742h152" stroke="var(--gold)" stroke-width="1" opacity="0.35"/>
    <rect x="4" y="686" width="152" height="92" rx="12" fill="none" stroke="var(--gold)" stroke-width="1.2" opacity="0.5"/>
    <rect x="0" y="740" width="212" height="72" rx="16" fill="var(--cream)" stroke="var(--ink)" stroke-width="2"/>
    <path d="M2 772c38 10 70-4 102 6s62 6 106-4" fill="none" stroke="var(--rose)" stroke-width="2" opacity="0.7"/>
    <path d="M130 742h82v40c-24 8-56 6-82-2Z" fill="var(--rose)" opacity="0.45" stroke="var(--ink)" stroke-width="1.2"/>
    <path d="M136 748h70" stroke="var(--gold)" stroke-width="1.2" opacity="0.6"/>
    <rect x="2" y="810" width="208" height="12" rx="4" fill="var(--wood-2)" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M14 822v12M196 822v12" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}

export function vanity(): string {
  return `<g id="vanity">
    <ellipse cx="100" cy="504" rx="82" ry="11" fill="#6b3a45" opacity="0.14"/>
    <path d="M58 240c-12 14-18 38-18 62 0 30 12 52 28 62" fill="none" stroke="var(--gold)" stroke-width="2.4"/>
    <path d="M142 240c12 14 18 38 18 62 0 30-12 52-28 62" fill="none" stroke="var(--gold)" stroke-width="2.4"/>
    <ellipse cx="100" cy="302" rx="55" ry="66" fill="url(#mirrorGlass)" stroke="url(#gilt)" stroke-width="4"/>
    <ellipse cx="100" cy="302" rx="49" ry="60" fill="none" stroke="var(--gold)" stroke-width="1" opacity="0.7"/>
    <ellipse cx="82" cy="280" rx="16" ry="30" fill="#fff" opacity="0.35" transform="rotate(-14 82 280)"/>
    <path d="M100 232l5 6 8 1-6 5 2 8-9-4-9 4 2-8-6-5 8-1Z" fill="url(#gilt)" stroke="var(--ink)" stroke-width="0.9"/>
    <g fill="url(#gilt)" stroke="var(--ink)" stroke-width="0.7">
      ${[
        [56, 268],
        [58, 302],
        [62, 336],
        [74, 360],
        [100, 370],
        [126, 360],
        [138, 336],
        [142, 302],
        [144, 268],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`)
        .join('')}
    </g>
    <rect x="26" y="376" width="150" height="11" rx="4" fill="var(--wood)" stroke="var(--ink)" stroke-width="1.8"/>
    <path d="M26 376h150" stroke="var(--gold)" stroke-width="1.4"/>
    <rect x="34" y="387" width="134" height="9" rx="2" fill="var(--wood-2)" opacity="0.65"/>
    <rect x="34" y="396" width="40" height="24" rx="3" fill="var(--wood-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="110" y="396" width="58" height="24" rx="3" fill="var(--wood-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <circle cx="54" cy="408" r="2.4" fill="url(#gilt)" stroke="var(--ink)" stroke-width="0.9"/>
    <circle cx="139" cy="408" r="2.4" fill="url(#gilt)" stroke="var(--ink)" stroke-width="0.9"/>
    <path d="M46 420l4 46M154 420l-4 46" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
    <!-- table props -->
    <g stroke="var(--ink)" stroke-width="1.1">
      <rect x="40" y="352" width="13" height="18" rx="3" fill="var(--rose)"/>
      <rect x="44" y="345" width="5" height="8" rx="2" fill="var(--gold-light)"/>
      <rect x="58" y="358" width="9" height="12" rx="2" fill="var(--cream)"/>
      <rect x="134" y="346" width="15" height="24" rx="4" fill="var(--cream)"/>
      <rect x="139" y="340" width="5" height="8" rx="2" fill="var(--rose)"/>
      <rect x="88" y="362" width="22" height="14" rx="2" fill="var(--gold-light)"/>
      <path d="M92 362v-6M98 362v-9M104 362v-5" stroke-linecap="round"/>
    </g>
    <circle cx="92" cy="354" r="1.8" fill="var(--rose-deep)"/>
    <circle cx="99" cy="351" r="1.8" fill="var(--gold)"/>
    <circle cx="106" cy="355" r="1.8" fill="var(--cream)"/>
  </g>`;
}

export function shelf(): string {
  const row = (y: number, offset: number) =>
    [0, 1, 2, 3, 4, 5]
      .map((i) => {
        const h = 32 + ((i * 7 + offset) % 12);
        const colors = ['var(--rose)', 'var(--cream)', 'var(--gold-light)', 'var(--rose-deep)', 'var(--cream)'];
        const fill = colors[(i + offset) % colors.length];
        return `<rect x="${32 + i * 17}" y="${y - h}" width="${11 + (i % 3)}" height="${h}" rx="2" fill="${fill}" stroke="var(--ink)" stroke-width="1"/>`;
      })
      .join('');
  return `<g id="shelf">
    <ellipse cx="82" cy="700" rx="62" ry="9" fill="#6b3a45" opacity="0.14"/>
    <rect x="22" y="482" width="120" height="216" rx="4" fill="var(--wood)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="28" y="488" width="108" height="204" fill="var(--cream)" opacity="0.5"/>
    <path d="M22 482h120" stroke="var(--gold)" stroke-width="1.6"/>
    <path d="M28 554h108M28 624h108M28 692h108" stroke="var(--ink)" stroke-width="2"/>
    ${row(554, 0)}
    ${row(624, 2)}
    ${row(692, 1)}
    <rect x="28" y="692" width="108" height="8" fill="var(--wood-2)" opacity="0.55"/>
    <path d="M22 700h120" stroke="var(--ink)" stroke-width="2"/>
    <path d="M132 482v216" stroke="var(--gold)" stroke-width="1" opacity="0.5"/>
  </g>`;
}

export function dresser(): string {
  return `<g id="dresser">
    <ellipse cx="252" cy="512" rx="68" ry="9" fill="#6b3a45" opacity="0.14"/>
    <rect x="206" y="400" width="100" height="110" rx="4" fill="var(--wood)" stroke="var(--ink)" stroke-width="1.8"/>
    <path d="M206 400h100" stroke="var(--gold)" stroke-width="1.6"/>
    <g fill="var(--wood-2)" stroke="var(--ink)" stroke-width="1.2">
      <rect x="214" y="408" width="84" height="26" rx="3"/>
      <rect x="214" y="440" width="84" height="26" rx="3"/>
      <rect x="214" y="472" width="84" height="26" rx="3"/>
    </g>
    <g fill="url(#gilt)" stroke="var(--ink)" stroke-width="0.9">
      <circle cx="256" cy="421" r="2.6"/><circle cx="256" cy="453" r="2.6"/><circle cx="256" cy="485" r="2.6"/>
    </g>
    <path d="M212 392h92" stroke="var(--ink)" stroke-width="2"/>
    <g transform="translate(300 372)">
      <path d="M8 20c-4-6-2-12 3-12s7 6 3 12Z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1"/>
      <path d="M11 20v14" stroke="var(--ink)" stroke-width="1.6"/>
      <ellipse cx="11" cy="35" rx="5" ry="2" fill="var(--gold)" stroke="var(--ink)" stroke-width="1"/>
    </g>
  </g>`;
}

export function desk(): string {
  return `<g id="desk">
    <ellipse cx="306" cy="684" rx="78" ry="10" fill="#6b3a45" opacity="0.14"/>
    <rect x="232" y="596" width="150" height="10" rx="3" fill="var(--wood)" stroke="var(--ink)" stroke-width="1.8"/>
    <path d="M232 596h150" stroke="var(--gold)" stroke-width="1.4"/>
    <rect x="240" y="606" width="50" height="24" rx="3" fill="var(--wood-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <circle cx="265" cy="618" r="2.4" fill="url(#gilt)" stroke="var(--ink)" stroke-width="0.9"/>
    <path d="M244 630v44M370 630v44" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
    <path d="M300 606v34" stroke="var(--ink)" stroke-width="2.6" opacity="0.45"/>
    <g transform="translate(342 572)">
      <rect x="0" y="4" width="16" height="20" rx="3" fill="var(--cream)" stroke="var(--ink)" stroke-width="1.2"/>
      <path d="M14 8h4a4 4 0 0 1 0 8h-4" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
      <path d="M3 10h9" stroke="var(--rose-deep)" stroke-width="1.2" opacity="0.6"/>
    </g>
  </g>`;
}

export function vignette(): string {
  return `<rect x="0" y="0" width="390" height="900" fill="url(#vignette)" pointer-events="none"/>`;
}
