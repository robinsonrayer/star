/**
 * Photo sources. The files live in `public/assets/photos` and are committed to
 * the repo. The full size originals stay in `assets/photos/`, which git ignores:
 * everything published here was cropped and re-encoded first.
 *
 * Delete an entry and that spot falls back to the drawn illustration.
 */

const BASE = import.meta.env.BASE_URL;

/** Four polaroids on the wall, in wall order. */
export const WALL_PHOTOS: readonly string[] = [
  `${BASE}assets/photos/photo-1.webp`,
  `${BASE}assets/photos/photo-2.webp`,
  `${BASE}assets/photos/photo-3.webp`,
  `${BASE}assets/photos/photo-4.webp`,
];

/** The print that sits above the letter. */
export const LETTER_PHOTO = `${BASE}assets/photos/letter.webp`;
