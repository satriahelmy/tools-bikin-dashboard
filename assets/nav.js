(function () {
  const toolFolders = ['colorpalette', 'chart', 'resourcehub', 'tools'];
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const toolIndex = pathSegments.findIndex((segment) => toolFolders.includes(segment.toLowerCase()));
  const rootPath = toolIndex === -1
    ? (window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname.replace(/[^/]*$/, ''))
    : (() => {
        const prefix = pathSegments.slice(0, toolIndex).join('/');
        return prefix ? `/${prefix}/` : '/';
      })();

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('./nav.css', document.currentScript.src).href;
  document.head.appendChild(stylesheet);

  const links = [
    { id: 'home', label: 'Beranda', href: rootPath },
    { id: 'colorpalette', label: 'Color Palette', href: `${rootPath}colorpalette/` },
    { id: 'chart', label: 'Chart Guide', href: `${rootPath}chart/` },
    { id: 'resourcehub', label: 'Resource Hub', href: `${rootPath}resourcehub/` }
  ];
  const current = toolIndex === -1 || pathSegments[toolIndex].toLowerCase() === 'tools'
    ? 'home'
    : pathSegments[toolIndex].toLowerCase();

  const iconSvg = (id) => {
    const paths = {
      home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
      colorpalette: '<circle cx="12" cy="12" r="8.5"/><circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1" fill="currentColor" stroke="none"/><path d="M15.5 16.5c0-1.1.9-2 2-2h.5"/>',
      chart: '<path d="M4 19V5M4 19h16"/><rect x="7" y="12" width="2.5" height="4" rx=".5"/><rect x="11" y="9" width="2.5" height="7" rx=".5"/><rect x="15" y="6" width="2.5" height="10" rx=".5"/>',
      resourcehub: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12h8M12 8v8"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[id] || paths.home}</svg>`;
  };

  const aside = document.createElement('aside');
  aside.className = 'bd-global-sidebar';
  aside.id = 'bd-global-sidebar';
  aside.setAttribute('aria-label', 'Navigasi utama');
  aside.innerHTML = `
    <div class="bd-sidebar-brand"><span class="bd-brand-mark">b</span><span>bikindashboard</span></div>
    <nav class="bd-sidebar-nav">
      ${links.map((link) => `<a class="bd-sidebar-link${current === link.id ? ' is-active' : ''}" href="${link.href}"><span class="bd-sidebar-icon">${iconSvg(link.id)}</span><span>${link.label}</span></a>`).join('')}
    </nav>
    <div class="bd-sidebar-footer">Tool gratis untuk data analyst</div>`;

  const toggle = document.createElement('button');
  toggle.className = 'bd-sidebar-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Buka navigasi');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', aside.id);
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const backdrop = document.createElement('div');
  backdrop.className = 'bd-sidebar-backdrop';
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
  const syncSidebarState = () => {
    if (isMobile() && !document.body.classList.contains('bd-nav-open')) {
      aside.setAttribute('aria-hidden', 'true');
      aside.inert = true;
    } else {
      aside.removeAttribute('aria-hidden');
      aside.inert = false;
    }
  };
  const close = (restoreFocus = false) => {
    document.body.classList.remove('bd-nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka navigasi');
    syncSidebarState();
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const nextOpen = !document.body.classList.contains('bd-nav-open');
    if (nextOpen) {
      document.body.classList.add('bd-nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Tutup navigasi');
      syncSidebarState();
      if (isMobile()) aside.querySelector('a')?.focus();
    } else {
      close(true);
    }
  });
  backdrop.addEventListener('click', () => close(true));
  aside.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('bd-nav-open')) close(true);
  });
  document.body.classList.add('bd-with-nav');
  document.body.prepend(backdrop, toggle, aside);
  syncSidebarState();
})();
