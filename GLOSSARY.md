# Glossary

Terms this project uses in a specific way. Read this before changing a file name
or writing copy, so the words keep meaning the same thing.

## room

The single screen she lands on after the gate. One SVG elevation of a decorated
wall, 390 by 900 units, scaled to fit the viewport. Furniture sits at staggered
heights with shadow ellipses underneath, so the wall reads as a collage rather
than a floor plan. Lives in `src/room/`.

## wall elevation

The drawing style. We show the room from the front, the way a dollhouse wall
faces you, not from above. There is no floor plan and no camera movement. If a
new object needs to be added, place it on the wall band (y 0 to 790) or on one
of the existing furniture tops, and give it a shadow ellipse.

## hotspot

An invisible HTML button laid over the drawing. Each hotspot maps to one scene
and has its own box in `HOTSPOT_BOXES` (`src/room/room.ts`). Minimum target is
about 44 by 44 CSS pixels. The gold pulsing dot is the hotspot's only visual,
and it stops pulsing once the scene is done.

## scene

A full screen sheet that opens over the room. One scene at a time. The sheet
traps focus, locks body scroll, and returns focus to the hotspot that opened it.
Scenes live in `src/scenes/`, one file per scene, registered in
`src/scenes/index.ts`.

## beat

A scene with no choices: she reads two or three lines and closes it. The plush,
the pillow, the print, the laptop and the gif are beats. Beats still count as
visited, so the room can tell whether she has looked around.

## keepsake

A change in the room that proves she finished something. Keepsakes never gate
progress and she can still reach the door at any time.

| Scene done | Keepsake |
|---|---|
| vanity | look card pinned to the polaroid wall |
| shelf | nothing visible, the volumes stay read |
| window | constellation drawn on the window glass, room goes night |
| cupcake | cake appears on the stand |
| record | vinyl spins, `is-playing` on the record player |
| plush | hug counter keeps rising |
| door | letter stays unlocked |

## gate

The three question screen before the room. Answers are normalised (lowercase,
letters and digits only) and compared with a small edit distance, so case,
spacing and punctuation do not matter. Five wrong tries on one step reveals
`okay, just come in`. There is no lockout.

## gate step

One question in the gate. Each step is `{ prompt, hint, answer, also, tease }`
in `GATE_STEPS` (`src/copy.ts`). `tease` lines rotate on wrong answers and exist
nowhere else in the site.

## look card

The result of the vanity scene. Eight shade names, one line each, shown on a
card. Also drawn small on the wall once the scene is done.

## dusk theme

The darker palette and backdrop used by the window and the door. Set with
`theme: 'dusk'` when opening the scene. The body of a dusk scene is a dark rose
panel with a lighter glow at the top, so the move from the cream room reads as
evening rather than a different site.

## peek

`?peek` in the URL skips the gate. It exists for review only and is never linked
from the page. It does not set `entered`, so a normal visit still shows the gate.
