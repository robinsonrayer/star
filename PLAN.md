# Plan

What is built, what each piece contains, and what still needs her content.

## Shape of the site

```
gate (3 steps)
  -> room (one wall, 11 hotspots)
       -> 4 scenes with choices: vanity, window, door, cupcake
       -> 7 beats: shelf, record, plush, pillow, print, laptop, gif
```

Nothing blocks the door. Finishing scenes adds keepsakes to the room. State lives
in `localStorage` under `star.room.v1` and only remembers what is needed to draw
the keepsakes.

## Objects on the wall

| Object | Scene | Contents |
|---|---|---|
| vanity mirror | vanity | eight shades, one line each, ends in a look card |
| bookshelf | shelf | four manga volumes plus one blank, four panels each |
| window | window | tap five stars in order, one letter line per drawn line |
| door | door | the letter, her voice note, one song |
| record player | record | her "getting ready" SoundCloud playlist |
| plush unicorn | plush | three lines, hug counter, synthesised squeak |
| huggin pillow | pillow | three lines about the name |
| fawn print | print | one paragraph, no choices |
| laptop | laptop | typed terminal, three questions, then a joke |
| cake stand | cupcake | base, frosting, topping, one line per choice |
| gif frame | gif | the Patrick gif, unlabelled |

The gif also appears small on the laptop lid. It is never explained.

## Palette

Cream, rose, deep rose, gold, ink outlines for the room. The dusk scenes reuse
the same tokens with a dark rose panel on top. Tokens live in `:root` in
`src/style.css`, and `.room__frame.is-night` overrides them for the night room.

| Token | Value | Use |
|---|---|---|
| `--wall` | `#fcf2ee` | wall ground |
| `--wall-2` | `#f7e4e2` | wallpaper motif |
| `--rose` | `#e7a0b5` | curtains, soft fills |
| `--rose-deep` | `#a8445c` | bed, spines, links |
| `--rose-dark` | `#6e2038` | scene titles |
| `--gold` | `#c9a227` | frames, dots, gilt gradient |
| `--gold-light` | `#ecd494` | buttons |
| `--ink` | `#3b2b2e` | outlines, body text |

## Gate

| Step | Prompt | Accepted |
|---|---|---|
| 1 | what am i to you? | `I am your nerd` and close variants |
| 2 | and what do you hold when i am not there? | `Huggin pillow` and close variants |
| 3 | type the thing you send when there are no words | `jksdlkjdwjdk` |

Matching: lowercase, strip anything that is not a letter or digit, then compare
with Levenshtein distance. Tolerance is 2, or 3 when the answer is longer than
ten characters. Five wrong tries on a step shows the mercy link.

## Copy voice

Room labels and microcopy are lowercase. Scenes and the letter use second
person, present tense, short sentences, normal capitalisation. Teasing appears
only in gate wrong-answer lines. All of it lives in `src/copy.ts`.

## Her content

Two things are still empty and both are marked in `src/copy.ts`.

1. `VOICE_NOTE` expects `public/assets/audio/letter.mp3`. The voice block stays
   hidden until a real recording is there, so nothing looks broken in the
   meantime.
2. `FINAL_TRACK_URL` is empty. The door falls back to her playlist. Paste a
   SoundCloud track URL to use one song instead.

Photos are real: four on the wall and one above the letter. Originals stay in
`assets/photos/`, which git ignores. The published copies in
`public/assets/photos/` are cropped, stripped and compressed by hand. See
`assets/photos/README.md`.

## Run it

```sh
npm install
npm run dev        # local server
npm run build      # typecheck plus production build into dist/
npm run preview    # serve dist/
```

`?peek` skips the gate while testing.

## Deploy to GitHub Pages

The build uses `base: './'`, so it works at any subpath.

1. Create a repository. Use a slug that nobody would guess, for example
   `paper-moon-estera`. Do not use her name alone.
2. Push this folder to the default branch.
3. In the repository, open Settings, then Pages, and set Source to
   `GitHub Actions`.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes on every
   push.
5. The site appears at `https://<username>.github.io/<slug>/`.

Before sharing the link, check that `robots.txt` and the `noindex` meta tag are
both still in place. The page asks not to be indexed.

## If the weekend gets tight

Cut the cupcake stand and the fawn print first. Both are optional beats. Keep the
vanity, the shelf, the window and the door.
