# a room for you

A small gift site, one page, built for one person. Pink and gold, everything
drawn by hand in SVG, no framework.

## Run

```sh
npm install
npm run dev
```

`?peek` skips the gate.

## Build and deploy

```sh
npm run build
```

The output goes to `dist/`. Pushing to `main` deploys it to GitHub Pages through
`.github/workflows/deploy.yml`, once Pages is set to use GitHub Actions in the
repository settings.

## Files worth knowing

| Path | What is in it |
|---|---|
| `src/copy.ts` | every line she reads, all three gate answers, the letter |
| `src/style.css` | palette tokens, room scaling, gate, scenes |
| `src/room/art-room.ts` | wall, window, door, bed, vanity, shelf, dresser, desk |
| `src/room/art-props.ts` | polaroids, record player, plush, pillow, laptop, stickers |
| `src/scenes/` | one file per scene |
| `src/state.ts` | what the site remembers between visits |
| `GLOSSARY.md` | the words this project uses in a specific way |
| `PLAN.md` | scene specs, gate flow, palette, deploy steps |
| `assets/audio/README.md` | how to add the voice note |
| `assets/photos/README.md` | how to add photos, and when not to |
