/**
 * Small, throwaway state. Safari clears localStorage after seven days without a
 * visit, so nothing here is load-bearing: the site works from scratch every time.
 */

export type SceneId =
  | 'vanity'
  | 'shelf'
  | 'window'
  | 'door'
  | 'record'
  | 'plush'
  | 'pillow'
  | 'bambi'
  | 'laptop'
  | 'cupcake'
  | 'gif';

export interface Cupcake {
  base: string | null;
  frosting: string | null;
  topping: string | null;
}

export interface Data {
  entered: boolean;
  done: SceneId[];
  hugs: number;
  shades: string[];
  cupcake: Cupcake;
  constellation: number;
  night: boolean;
  musicOn: boolean;
}

const KEY = 'star.room.v1';

function fresh(): Data {
  return {
    entered: false,
    done: [],
    hugs: 0,
    shades: [],
    cupcake: { base: null, frosting: null, topping: null },
    constellation: 0,
    night: false,
    musicOn: false,
  };
}

function read(): Data {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const parsed = JSON.parse(raw) as Partial<Data>;
    return { ...fresh(), ...parsed, cupcake: { ...fresh().cupcake, ...(parsed.cupcake ?? {}) } };
  } catch {
    return fresh();
  }
}

export const data: Data = read();

export function save(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode, full disk, or Safari being Safari. Not worth a message. */
  }
}

export function isDone(id: SceneId): boolean {
  return data.done.includes(id);
}

export function markDone(id: SceneId): void {
  if (!data.done.includes(id)) {
    data.done.push(id);
    save();
  }
}

export function visitedCount(): number {
  return data.done.filter((id) => id !== 'gif' && id !== 'record').length;
}
