# photos

Two folders, on purpose.

- `assets/photos/` holds the originals. Git ignores it, and the build ignores
  it, so the full size files with their metadata never leave this machine.
- `public/assets/photos/` holds what ships. Only cropped, stripped, compressed
  copies live there.

## What is published

| File | Where it appears | Source |
|---|---|---|
| `photo-1.webp` | wall polaroid, top left | selfie1.png |
| `photo-2.webp` | wall polaroid, top right | my-swag-is-whimsy.png |
| `photo-3.webp` | wall polaroid, bottom left | nail-decoration-pic.png |
| `photo-4.webp` | wall polaroid, bottom right | selfie3.png |
| `letter.webp` | above the letter | selfie2.png |

Each polaroid is 264x240, a 1.1 crop. The letter print keeps its own 4:3 frame.
All five files together are about 35 KB.

## Replacing a photo

Run this from the repo root, swapping the source and the crop:

```
ffmpeg -y -i assets/photos/NEW.png \
  -vf "crop=W:H:X:Y,scale=264:240:flags=lanczos,setsar=1" \
  -frames:v 1 /tmp/crop.png
cwebp -q 82 /tmp/crop.png -o public/assets/photos/photo-1.webp
```

`cwebp` drops EXIF and colour profiles unless you ask it not to. Keep it that
way: a phone photo can carry the place it was taken.

To drop a photo instead, delete its line from `WALL_PHOTOS` in `src/photos.ts`.
That polaroid falls back to the drawn illustration.

## Repo is public

Her photos are committed to `robinsonrayer/star`, which anyone can clone, and
git history keeps them even after a later delete. Search engines are blocked by
`noindex` and `robots.txt`, but a link still works for anyone who has it. That
is the trade you make for putting them on a page.
