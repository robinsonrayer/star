/**
 * Every word she reads lives here.
 *
 * Rule from the brief:
 * - room labels and microcopy are lowercase coquette
 * - scenes and the letter are second person, present tense, short sentences
 * - nothing original-fact is invented. Lines marked EDIT ME are placeholders
 *   that need a real detail from you.
 */

export const NAME_ON_SCREEN = 'Star';
/** Her real name. Appears exactly once, on the last line of the letter. */
export const REAL_NAME = 'Estera';

/** Her playlist, the one she made for getting ready. */
export const PLAYLIST_URL = 'https://soundcloud.com/estera-185855725/sets/getting-ready';
/**
 * The one song for the door. Paste a SoundCloud track URL here when you pick it.
 * While it is empty the site keeps her playlist playing instead.
 */
export const FINAL_TRACK_URL = '';

/** Drop a voice note at public/assets/audio/letter.mp3 and it plays at the door. */
export const VOICE_NOTE = 'assets/audio/letter.mp3';

export const APP_TITLE = 'a room for you';

/* ------------------------------------------------------------------ gate */

export interface GateStep {
  prompt: string;
  hint: string;
  /** Normalised answer. Matching is forgiving: case, spaces and punctuation are ignored. */
  answer: string;
  /** Extra accepted forms. */
  also?: string[];
  tease: string[];
}

export const GATE_INTRO = {
  kicker: 'before you come in',
  lines: ['one small thing.', 'you already know it.'],
  placeholder: 'type here',
  submit: 'go on',
};

export const GATE_STEPS: GateStep[] = [
  {
    prompt: 'what do you hold when i am not there?',
    hint: 'it is soft and it has a name.',
    answer: 'pillow',
    also: ['huggin pillow', 'hugging pillow', 'hugginpillow', 'huggingpillow', 'the pillow'],
    tease: [
      'that is not what you call it.',
      'close. it is the one you steal.',
      'you are overthinking a pillow.',
    ],
  },
];

export const GATE_DONE = {
  line: 'there you are.',
  sub: 'come in.',
  /** Shown after five wrong tries on one step. She never gets locked out. */
  mercy: 'okay, just come in',
};

/* ------------------------------------------------------------------ room */

export const ROOM_HINT = 'tap anything';
export const ROOM_SOUND_LABEL = 'sound';

export interface HotspotCopy {
  label: string;
  aria: string;
}

export const HOTSPOTS: Record<string, HotspotCopy> = {
  vanity: { label: 'your vanity', aria: 'open the vanity' },
  shelf: { label: 'the shelf', aria: 'open the bookshelf' },
  window: { label: 'the window', aria: 'open the window' },
  door: { label: 'the door', aria: 'open the door' },
  record: { label: 'the record player', aria: 'play the record player' },
  plush: { label: 'the plush', aria: 'pick up the unicorn' },
  pillow: { label: 'huggin pillow', aria: 'squeeze the pillow' },
  bambi: { label: 'the print', aria: 'look at the print on the wall' },
  laptop: { label: 'the laptop', aria: 'look at the laptop' },
  cupcake: { label: 'something small', aria: 'look at the cake stand' },
  gif: { label: '', aria: 'something small is moving' },
};

/* --------------------------------------------------------------- vanity */

export const VANITY = {
  title: 'your vanity',
  intro: 'eight shades. all yours. pick one and i will tell you what it is.',
  shadeLabel: 'tap a shade',
  finish: 'finish the look',
  again: 'start over',
  cardTitle: 'look card',
  cardNote: 'keep it. it goes on the wall.',
  shades: [
    { name: 'sad girl', color: '#b3455e', line: 'You wear melancholy like a colour nobody else can pull off.' },
    { name: 'pink in the night', color: '#e79aae', line: 'You are the softest thing in a very loud world.' },
    { name: 'coquette habit', color: '#f3c3cf', line: 'You make small gestures feel like a whole language.' },
    { name: 'my kind of woman', color: '#a93f4b', line: 'You are the version of a person I would choose again.' },
    { name: 'sour switchblade', color: '#d9748c', line: 'You are sweet, and you have a spine. Both matter.' },
    { name: 'ultraviolence', color: '#5c1f2e', line: 'You feel things fully. I like that you never pretend not to.' },
    { name: 'softcore', color: '#e3b7a3', line: 'You are the part of the day I look forward to.' },
    { name: 'queencard', color: '#c9a227', line: 'You walk into a room and the room adjusts.' },
  ],
};

/* ---------------------------------------------------------------- shelf */

export const SHELF = {
  title: 'the shelf',
  intro: 'four volumes and one that is still blank.',
  back: 'put it back',
  volumes: [
    {
      spine: 'vol. 1',
      title: 'the way you type',
      panels: [
        '🧍‍♀️🧍‍♀️',
        'LESSSSGOOOOOOOO',
        'OMDSSSSS',
        'I keep the good ones.',
      ],
    },
    {
      spine: 'vol. 2',
      title: 'the same gif',
      panels: [
        'You send it when you are annoyed.',
        'You send it when you are happy.',
        'You send at right time.',
        'It works every time.',
      ],
    },
    {
      spine: 'vol. 3',
      title: 'pink and gold',
      panels: [
        'You said pink, so the whole room is pink.',
        'You said gold, so there is gold in the corners.',
        'You did not say haunted. I added that part.',
        'I think you will like it.',
      ],
    },
    {
      spine: 'vol. 4',
      title: 'the pillow',
      panels: [
        'It has a name.',
        'You know the name.',
        'I am not printing the name here.',
        'Ask me in person.',
      ],
    },
  ],
  blank: {
    spine: 'vol. 5',
    title: 'to be continued',
    body: 'This one is empty on purpose. I ran out of a weekend, not out of things to say.',
  },
};

/* --------------------------------------------------------------- window */

export const WINDOW = {
  title: 'the window',
  intro: 'i left the sky open. connect the five bright ones.',
  hint: 'tap a star, then the next one',
  done: 'you made a star.',
  again: 'again',
  /** One line unlocks per drawn line of the constellation. */
  lines: [
    'You are the first person I want to tell things to.',
    'Not the big things. The small ones, the ones that happen on the way home.',
    'You listen like it matters, even when it does not.',
    'You are allowed to be tired. You are allowed to be happy first.',
    'Whatever is on your mind tonight can wait until morning.',
  ],
};

/* ----------------------------------------------------------------- door */

export const DOOR = {
  title: 'the door',
  intro: 'you found it.',
  play: 'play our song',
  voiceTitle: 'from me, out loud',
  letter: [
    'You are the person I look for in a room before I look at anything else.',
    'You make ordinary days feel like something worth keeping, and you do it without trying.',
    'You are my star to the sky, near the moon we look at every night.',
    'So I built you a room. It has all your things in it, because I see.',
    'Happy just because. There is no occasion. I just wanted you to have this.',
  ],
  /** Last line. Her real name appears exactly once, here. */
  signoff: REAL_NAME,
  from: 'For my dearly beloved',
  earlyLine: 'the rest of the room is still dark. have a look around first?',
  earlyStay: 'stay here',
  earlyGo: 'show me the room',
};

/* ------------------------------------------------------------ beats */

export const RECORD = {
  title: 'the record player',
  idle: 'needle down?',
  playing: 'playing, quietly',
  note: 'this is the playlist you made for getting ready. i listen to it when you are not here.',
  open: 'open in soundcloud',
};

export const PLUSH = {
  title: 'the plush',
  lines: [
    'It does not talk. It is still better company than most.',
    'You have squeezed this thing to death. It is holding up.',
    'One day I will win an argument against it. Not today.',
  ],
  squeeze: 'squeeze',
};

export const PILLOW = {
  title: 'huggin pillow',
  squeeze: 'squeeze it',
  lines: [
    'Estera I miss you!',
    'Estera I want you!',
    "Estera You're mine and I am yours.",
    'Star I love you.',
  ],
};

export const BAMBI = {
  title: 'the print',
  body: 'You have the same look as this deer. Big eyes, quietly taking everything in, pretending not to be scared of the room. You are braver than you think you are.',
};

export const LAPTOP = {
  title: 'the laptop',
  lines: [
    'star@the-room:~$ I am getting a signal',
    "star@the-room:~$ It's your boyfriend",
    'star@the-room:~$ jksdlkjdwjdk',
  ],
  after: '',
};

export const CUPCAKE = {
  title: 'a tiny cake',
  intro: 'three choices. i will remember what you pick.',
  back: 'back',
  again: 'another one',
  bases: ['vanilla', 'chocolate', 'red velvet'],
  frostings: ['strawberry', 'cream', 'pink buttercream'],
  toppings: ['a cherry', 'gold flakes', 'a tiny star'],
  doneTitle: 'made by you',
  doneNote: 'It stays on the stand.',
  lines: {
    vanilla: 'You always pick the one people underestimate.',
    chocolate: 'You are not sorry about it and you should not be.',
    'red velvet': 'Dramatic on the outside. Soft where it counts.',
    strawberry: 'Sweet is not a weakness.',
    cream: 'You are calmer than you let people think.',
    'pink buttercream': 'Obviously.',
    'a cherry': 'One small thing on top. That is the whole trick.',
    'gold flakes': 'You do like being looked at. It is allowed.',
    'a tiny star': 'For the name.',
  } as Record<string, string>,
};

export const GIF_NOTE = 'you sent this to me forty times. it is on the wall now.';
