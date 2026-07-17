// ========================================================
// ELITE PROTOCOL — WEB COMPONENTS (v2026.3)
// Centralised header + navigation for all pages.
// ========================================================

class EliteHeader extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || 'solo';

        // Pages inside /pages/ need "../" to reach root assets; index.html does not.
        const isRoot = (activePage === 'solo');
        const root   = isRoot ? ''   : '../';
        const pages  = isRoot ? 'pages/' : '';

        // ---------- Per-page stat chip & action button ----------
        const PAGE_CONFIG = {
            solo:       { label: 'SESIÓN',   id: 'total-earnings',      resetId: 'reset-btn' },
            group:      { label: 'GRUPO',    id: 'grp-earnings',        resetId: 'reset-btn-grp' },
            weekly:     { label: 'SEMANAL',  id: 'weekly-earnings',     resetId: 'reset-btn-weekly' },
            retirement: { label: 'RETIRO',   id: 'retirement-earnings', resetId: 'reset-btn-retirement' },
            guide:      { label: 'REQUISITOS', id: null,  staticValue: 'INFRAESTRUCTURA', resetId: 'reset-btn-requirements' },
            catalog:    { label: null,        id: null,  resetId: 'reset-btn-catalog' },
            qol:        { label: null,        id: null,  staticValue: null },
        };

        const cfg = PAGE_CONFIG[activePage] || {};

        // Stat chip (earnings display or static label)
        let statsHTML = '';
        if (cfg.label) {
            const valueContent = cfg.id
                ? `<span class="value" id="${cfg.id}">$0</span>`
                : `<span class="value">${cfg.staticValue || ''}</span>`;
            statsHTML = `
                <div class="stat-item">
                    <span class="label">${cfg.label}</span>
                    ${valueContent}
                </div>`;
        }

        // Reset button
        let actionHTML = '';
        if (cfg.resetId) {
            actionHTML = `
                <button id="${cfg.resetId}" class="btn icon-btn" title="Reiniciar">
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>`;
        }

        // ---------- Navigation items (Spanish, consistent) ----------
        const NAV_ITEMS = [
            { key: 'guide', href: `${pages}requirements.html`, icon: 'construct', text: 'Requisitos' },
            { key: 'solo',       href: `${root}index.html`,                icon: 'person',   text: 'Solo' },
            { key: 'group',      href: `${pages}group_routine.html`,       icon: 'people',   text: 'Grupo' },
            { key: 'weekly',     href: `${pages}weekly_routine.html`,      icon: 'calendar',  text: 'Semanal' },
            { key: 'retirement', href: `${pages}retirement.html`,          icon: 'cafe',      text: 'Retiro' },
            { key: 'catalog',    href: `${pages}catalog.html`,             icon: 'cart',      text: 'Catálogo' },
            { key: 'qol',        href: `${pages}quality_of_life.html`,     icon: 'flash',     text: 'QoL' },
        ];

        const navLinks = NAV_ITEMS.map(item => {
            const isActive  = (item.key === activePage);
            const iconName  = item.icon + (isActive ? '' : '-outline');
            const cssClass  = 'nav-link' + (isActive ? ' active' : '');
            return `<a href="${item.href}" class="${cssClass}">
                        <ion-icon name="${iconName}"></ion-icon>
                        <span>${item.text}</span>
                    </a>`;
        }).join('\n');

        // ---------- Render ----------
        this.innerHTML = `
        <header class="top-bar glass-panel">
            <div class="logo-area">
                <ion-icon name="shield-half-outline" class="logo-icon"></ion-icon>
                <div class="logo-text">
                    <h1>ELITE <span class="accent">PROTOCOL</span></h1>
                    <span class="version-tag">v2026.3</span>
                </div>
            </div>

            <div class="global-stats">
                ${statsHTML}
            </div>

            <nav class="main-nav">
                ${navLinks}
            </nav>

            <div class="actions">
                ${actionHTML}
            </div>
        </header>`;
    }
}

customElements.define('elite-header', EliteHeader);
