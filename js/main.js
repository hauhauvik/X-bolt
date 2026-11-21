document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Toast notifikace
    // -------------------------------------------------------------
    const toastEl = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    let toastTimer;

    function showToast(message) {
        toastMsg.textContent = message;
        toastEl.classList.remove('translate-y-24', 'opacity-0');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.add('translate-y-24', 'opacity-0');
        }, 4000);
    }

    // -------------------------------------------------------------
    // 2. Mobilní hamburger menu s plynulým vysunutím
    // -------------------------------------------------------------
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function setMenuState(open) {
        isMenuOpen = open;
        menuBtn.setAttribute('aria-expanded', String(open));
        if (open) {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            mobileMenu.classList.remove('opacity-0');
            mobileMenu.classList.add('opacity-100');
        } else {
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
        }
        iconOpen.classList.toggle('hidden', open);
        iconClose.classList.toggle('hidden', !open);
    }

    menuBtn.addEventListener('click', () => setMenuState(!isMenuOpen));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => setMenuState(false));
    });

    // -------------------------------------------------------------
    // 3. Animace odhalení sekcí při scrollu
    // -------------------------------------------------------------
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));

    // -------------------------------------------------------------
    // 4. Katalogy nástrojů SGS (12 reálných PDF odkazů)
    // -------------------------------------------------------------
    const sgsBrochures = [
        {
            title: 'High Performance Drills Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/5679highperformancedrills.pdf'
        },
        {
            title: 'APR APF Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/8752sgsaprapf.pdf'
        },
        {
            title: 'Multi-Carb Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/4644multi-carb_brochure.pdf'
        },
        {
            title: 'Composites Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/6439composites.pdf'
        },
        {
            title: 'Performance for Aluminum',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/7508sgs_aluminum_performance.pdf'
        },
        {
            title: 'Series 33 Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/4122series33.pdf'
        },
        {
            title: 'T-Carb Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/3557t-carb-brochure.pdf'
        },
        {
            title: 'PCR Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/6613series-29-pcr-lit.pdf'
        },
        {
            title: 'Z-Carb HPR Brochure',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/5716sgs_zcarbhpr.pdf'
        },
        {
            title: 'SGS Europe Product Catalog',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/1675kspt_2016_global_product_catalog_metric.pdf'
        },
        {
            title: 'SGS Product Catalog - Chinese Edition',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/8682sgs-chinese-catalog-2013.pdf'
        },
        {
            title: 'SGS Product Catalog',
            url: 'https://www.xbolt.cz/wp-content/uploads/2026/06/4109kspt_2016_global_product_catalog.pdf'
        }
    ];

    const sgsGrid = document.getElementById('sgs-catalog-grid');

    function renderSgsGrid() {
        sgsGrid.innerHTML = '';

        sgsBrochures.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'w-full text-left group p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white hover:border-brand-lime hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4';
            link.innerHTML = `
                <div class="flex items-center gap-4 min-w-0">
                    <div class="w-11 h-11 rounded-xl bg-neutral-100 group-hover:bg-brand-lime/15 text-neutral-700 group-hover:text-brand-limeHover flex items-center justify-center shrink-0 transition-colors">
                        <span class="text-[11px] font-extrabold tracking-wider uppercase">PDF</span>
                    </div>
                    <div class="min-w-0">
                        <span class="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Kyocera SGS</span>
                        <h3 class="font-display font-bold text-sm sm:text-base text-neutral-900 truncate">${item.title}</h3>
                    </div>
                </div>
                <div class="w-9 h-9 rounded-lg bg-neutral-50 group-hover:bg-brand-lime text-neutral-400 group-hover:text-black flex items-center justify-center shrink-0 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </div>
            `;
            sgsGrid.appendChild(link);
        });
    }

    renderSgsGrid();

    // Toast upozornění při stažení lokálního PDF katalogu
    document.querySelectorAll('.pdf-download-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Spouštím stahování souboru XBolt_katalog_2022.pdf');
        });
    });

    // -------------------------------------------------------------
    // 5. B2B Poptávkový formulář s toast potvrzením
    // -------------------------------------------------------------
    const form = document.getElementById('inquiry-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Děkujeme! Vaše B2B poptávka byla úspěšně odeslána.');
        form.reset();
    });
});
