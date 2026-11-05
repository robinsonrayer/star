/** SoundCloud embedding. Nothing loads until she taps, because iOS will not play otherwise. */

export function embedUrl(trackUrl: string, autoPlay = true): string {
  const params = new URLSearchParams({
    url: trackUrl,
    color: '#a8445c',
    auto_play: autoPlay ? 'true' : 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: 'true',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function mountPlayer(host: HTMLElement, trackUrl: string): HTMLIFrameElement {
  const frame = document.createElement('iframe');
  frame.className = 'player';
  frame.src = embedUrl(trackUrl);
  frame.title = 'soundcloud player';
  frame.setAttribute('allow', 'autoplay');
  frame.setAttribute('loading', 'eager');
  frame.setAttribute('scrolling', 'no');
  host.append(frame);
  return frame;
}
