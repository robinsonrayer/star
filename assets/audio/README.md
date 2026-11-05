# audio

The live file belongs at `public/assets/audio/letter.mp3`. This folder is for
notes and for takes you have not shipped.

## The voice note

Record 90 seconds on your phone. Say it out loud, once, without editing. Then:

1. Export as `letter.mp3`. Mono, 64 to 96 kbps is enough.
2. Copy it to `public/assets/audio/letter.mp3`.
3. Run `npm run build` so it lands in `dist/assets/audio/`.

The door shows a player only when the file exists and reports a length over half
a second. Until then she sees the letter and no player, so a missing file never
looks like a bug.

## The song

`FINAL_TRACK_URL` in `src/copy.ts` takes a SoundCloud track URL, not an embed
URL. Paste the track page address, for example
`https://soundcloud.com/artist/track-title`. While it is empty, the door plays
her `getting ready` playlist instead.

## Length

Keep the voice note under two minutes. The letter is meant to be read while it
plays, and the letter takes about that long to scroll.

## What not to say

No dates, no flight numbers, no addresses. This page lives on a URL. Everything
on it should be safe if a stranger found the link.
