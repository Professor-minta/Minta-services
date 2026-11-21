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
    if (!/^[\w-]{11}$/.test(id)) { block.hidden = true; return; }
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

(() => {
  const diapo = document.querySelector('.diapo');
  if (!diapo) return;
  const slides = [...diapo.querySelectorAll('.diapo-slide')];
  const points = diapo.querySelector('.diapo-points');
  const calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let actuel = 0;
  let minuteur = 0;
  const boutons = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Image ${i + 1} sur ${slides.length}`);
    b.onclick = () => { montrer(i); relancer(); };
    points.append(b);
    return b;
  });
  function montrer(i) {
    actuel = (i + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-on', k === actuel); s.setAttribute('aria-hidden', String(k !== actuel)); });
    boutons.forEach((b, k) => b.setAttribute('aria-selected', String(k === actuel)));
  }
  function relancer() {
    clearInterval(minuteur);
    if (!calme) minuteur = setInterval(() => montrer(actuel + 1), 3000);
  }
  diapo.addEventListener('mouseenter', () => clearInterval(minuteur));
  diapo.addEventListener('mouseleave', relancer);
  diapo.addEventListener('focusin', () => clearInterval(minuteur));
  diapo.addEventListener('focusout', relancer);
  let debut = null;
  diapo.addEventListener('touchstart', (e) => { debut = e.touches[0].clientX; }, { passive: true });
  diapo.addEventListener('touchend', (e) => {
    if (debut === null) return;
    const ecart = e.changedTouches[0].clientX - debut;
    debut = null;
    if (Math.abs(ecart) > 40) { montrer(actuel + (ecart < 0 ? 1 : -1)); relancer(); }
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(minuteur) : relancer()));
  montrer(0);
  relancer();
})();
