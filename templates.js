// templates.js — injects shared header and footer into every static page
(function(){
  const menu = [
    { label: 'Home', href: 'index.html' },
    { label: 'Custom Rugs', href: 'custom-rugs.html' },
    { label: 'Ruglets', href: 'ruglets.html' },
    { label: 'Archive', href: 'products.html' },
    { label: 'Meet Your Maker', href: 'meet-your-maker.html' }
    
  ];

  function getCurrentPage(){
    // Get current page filename by parsing the URL
    const href = window.location.href;
    // Find the last slash and extract everything after it
    const filename = href.substring(href.lastIndexOf('/') + 1);
    // Remove any query params or hash fragments
    return filename.split('?')[0].split('#')[0] || 'index.html';
  }

  function buildHeader(){
    const navItems = menu.map(item => `
      <li class="nav-item"><a href="${item.href}" class="nav-link">${item.label}</a></li>
    `).join('');

    return `
      <header class="py-4">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center">
            <img src="assets/images/xTBx.png" alt="xTuftyBoyx logo" class="w-12 h-14 mx-auto mb-2 object-contain" />
            <h1 class="brand-title"><span class="title-x">x</span>TuftyBoy<span class="title-x">x</span></h1>
          </div>
          <nav class="mt-4">
            <ul class="nav-list">${navItems}</ul>
          </nav>
        </div>
      </header>
    `;
  }

  function buildFooter(){
    return `
      <footer class="bg-[#2e2e2e] text-white site-footer">
        <div class="max-w-7xl mx-auto px-9">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div class="tracking-[4px] text-sm">© 2026 xTuftyBoyx</div>
            <div class="flex gap-4 justify-center md:justify-end">
              <a href="#" class="w-11 h-11 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8.94 6.5V5.03c0-.43.28-.53.48-.53h1.2V2.67L8.97 2.66C7.01 2.66 6.56 4.14 6.56 5.09V6.5H5v2.02h1.56V13h2.38V8.52h1.61l.22-2.02H8.94z"/></svg>
              </a>
              <a href="http://www.instagram.com/xtuftyboyx" class="w-11 h-11 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.9A4.1 4.1 0 1 0 8 12.1A4.1 4.1 0 1 0 8 3.9zm0 6.8A2.7 2.7 0 1 1 8 5.3a2.7 2.7 0 0 1 0 5.4z"/><path d="M12.7 0H3.3A3.3 3.3 0 0 0 0 3.3v9.4A3.3 3.3 0 0 0 3.3 16h9.4a3.3 3.3 0 0 0 3.3-3.3V3.3A3.3 3.3 0 0 0 12.7 0zm1.9 12.7a1.9 1.9 0 0 1-1.9 1.9H3.3a1.9 1.9 0 0 1-1.9-1.9V3.3A1.9 1.9 0 0 1 3.3 1.4h9.4a1.9 1.9 0 0 1 1.9 1.9z"/><circle cx="12.2" cy="3.8" r=".8"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function setActiveNav(){
    const currentPage = getCurrentPage().toLowerCase();
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      // Use inline styles for better reliability across all browsers
      if(href === currentPage || (currentPage === '' && href === 'index.html')){
        link.style.color = '#d85a3a';
       
      }
      link.style.textAlign = 'center';
    });
  }

  function inject(){
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if(headerEl) headerEl.innerHTML = buildHeader();
    if(footerEl) footerEl.innerHTML = buildFooter();

    const navList = document.querySelector('.nav-list');
    if(navList){
      navList.classList.add('flex','justify-center','gap-4','flex-wrap','text-xs','uppercase','tracking-widest','text-gray-500');
      const items = navList.querySelectorAll('.nav-item');
      items.forEach(it=> it.classList.add('list-none','flex-1','min-w-[110px]'));
    }

    setActiveNav();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
