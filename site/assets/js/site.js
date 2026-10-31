(() => {
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('nav');
  if (menu && nav) {
    const close = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
    menu.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  const year = document.getElementById('annee');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('[data-youtube]').forEach((block) => {
    const id = (block.dataset.youtube || '').trim();
    if (!/^[\w-]{11}$/.test(id)) return;
    const frame = block.querySelector('.video-frame, .video-thumb');
    if (!frame) return;
    frame.href = `https://www.youtube.com/watch?v=${id}`;
    frame.addEventListener('click', (event) => {
      event.preventDefault();
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = 'Vidéo Minta Services';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
    }, { once: true });
  });
})();
