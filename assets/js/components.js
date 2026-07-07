// ========================================================
// ELITE PROTOCOL WEBASTICS - WEB COMPONENTS (v2026.3)
// ========================================================

class EliteHeader extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || 'solo';
        const isSubPage = this.hasAttribute('subpage') || activePage !== 'solo';
        const prefix = isSubPage ? '../' : '';
        const rootPrefix = isSubPage ? '../' : '';

        // Render Stats Area based on page
        let statsHTML = '';
        let actionHTML = '';

        if (activePage === 'solo') {
            statsHTML = `
                <div class="stat-item">
                    <span class="label">SESIÓN ACTUAL</span>
                    <span class="value" id="total-earnings">$0</span>
                </div>
            `;
            actionHTML = `
                <button id="reset-btn" class="btn icon-btn" title="Reiniciar Día">
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>
            `;
        } else if (activePage === 'group') {
            statsHTML = `
                <div class="stat-item">
                    <span class="label">GANANCIA GRUPAL</span>
                    <span class="value" id="grp-earnings">$0</span>
                </div>
            `;
            actionHTML = `
                <button id="reset-btn-grp" class="btn icon-btn" title="Reiniciar Día">
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>
            `;
        } else if (activePage === 'weekly') {
            statsHTML = `
                <div class="stat-item">
                    <span class="label">GANANCIA SEMANAL</span>
                    <span class="value" id="weekly-earnings">$0</span>
                </div>
            `;
            actionHTML = `
                <button id="reset-btn-weekly" class="btn icon-btn" title="Reiniciar Progreso Semanal">
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>
            `;
        } else if (activePage === 'retirement') {
            statsHTML = `
                <div class="stat-item">
                    <span class="label">GANANCIA ESTIMADA</span>
                    <span class="value" id="retirement-earnings">$0</span>
                </div>
            `;
            actionHTML = `
                <button id="reset-btn-retirement" class="btn icon-btn" title="Reiniciar Jubilación">
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>
            `;
        } else if (activePage === 'guide') {
            statsHTML = `
                <div class="stat-item">
                    <span class="label">ESTADO ACTUAL</span>
                    <span class="value">INFRAESTRUCTURA</span>
                </div>
            `;
        } else if (activePage === 'catalog') {
            // Stats bar is rendered at the bottom in catalog.html, top bar has no stats
            actionHTML = `
                <button id="reset-btn-catalog" class="btn icon-btn" title="Reiniciar Catálogo">
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>
            `;
        } else if (activePage === 'qol') {
            statsHTML = `
                <div class="stat-item">
                    <span class="label">ESTADO ACTUAL</span>
                    <span class="value">OPTIMIZACIÓN</span>
                </div>
            `;
        }

        this.innerHTML = `
        <header class="top-bar glass-panel">
            <div class="logo-area">
                <ion-icon name="shield-half-outline" class="logo-icon" style="font-size: 1.6rem; color: var(--accent-red);"></ion-icon>
                <div class="logo-text" style="display: flex; flex-direction: column;">
                    <h1 style="font-size: 1.1rem; font-weight: 800; letter-spacing: 1px; margin: 0; line-height: 1.1;">
                        ELITE <span style="color: var(--accent-red);">PROTOCOL</span>
                    </h1>
                    <span class="version-tag" style="font-size: 0.65rem; color: var(--text-tertiary); font-weight: 600; letter-spacing: 0.5px; margin-top: 1px;">
                        v2026.3
                    </span>
                </div>
            </div>

            <div class="global-stats" style="display: flex; align-items: center; gap: 1.5rem; flex-grow: 1; margin-left: 2rem;">
                ${statsHTML}
            </div>

            <nav class="main-nav">
                <a href="${rootPrefix}index.html" class="nav-link ${activePage === 'solo' ? 'active' : ''}">
                    <ion-icon name="person${activePage === 'solo' ? '' : '-outline'}"></ion-icon>
                    <span>Solo</span>
                </a>
                <a href="${prefix}group_routine.html" class="nav-link ${activePage === 'group' ? 'active' : ''}">
                    <ion-icon name="people${activePage === 'group' ? '' : '-outline'}"></ion-icon>
                    <span>Group</span>
                </a>
                <a href="${prefix}weekly_routine.html" class="nav-link ${activePage === 'weekly' ? 'active' : ''}">
                    <ion-icon name="calendar${activePage === 'weekly' ? '' : '-outline'}"></ion-icon>
                    <span>Weekly</span>
                </a>
                <a href="${prefix}retirement.html" class="nav-link ${activePage === 'retirement' ? 'active' : ''}">
                    <ion-icon name="cafe${activePage === 'retirement' ? '' : '-outline'}"></ion-icon>
                    <span>Retire</span>
                </a>
                <a href="${prefix}requirements.html" class="nav-link ${activePage === 'guide' ? 'active' : ''}">
                    <ion-icon name="book${activePage === 'guide' ? '' : '-outline'}"></ion-icon>
                    <span>Guide</span>
                </a>
                <a href="${prefix}catalog.html" class="nav-link ${activePage === 'catalog' ? 'active' : ''}">
                    <ion-icon name="cart${activePage === 'catalog' ? '' : '-outline'}"></ion-icon>
                    <span>Catalog</span>
                </a>
                <a href="${prefix}quality_of_life.html" class="nav-link ${activePage === 'qol' ? 'active' : ''}">
                    <ion-icon name="flash${activePage === 'qol' ? '' : '-outline'}"></ion-icon>
                    <span>QoL</span>
                </a>
            </nav>

            <div class="actions">
                ${actionHTML}
            </div>
        </header>
        `;
    }
}

customElements.define('elite-header', EliteHeader);
