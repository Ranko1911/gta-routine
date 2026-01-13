// ==========================================
// ELITE PROTOCOL ENGINE (v2026.2)
// ==========================================

const STORAGE_PREFIX = 'gta_elite_v26_';

document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATION ---
    function init() {
        injectCustomChecks(); // Fix legacy HTML missing custom spans
        restoreCheckboxState();
        restoreTimers(); // Restores UI for running timers
        updateCalculations();
        restoreCounters(); // Restore counters after checkboxes

        // Start Global Ticker
        setInterval(tickTimers, 1000);

        // Request Notification Permission
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }

    // Fix for missing custom-check spans in older HTML structures
    function injectCustomChecks() {
        document.querySelectorAll('.task-item').forEach(label => {
            const input = label.querySelector('input[type="checkbox"]');
            if (input && !label.querySelector('.custom-check')) {
                const span = document.createElement('span');
                span.className = 'custom-check';
                input.insertAdjacentElement('afterend', span);
            }
        });
    }

    // --- DOM ELEMENTS ---
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const resetBtn = document.getElementById('reset-btn');
    const resetBtnGrp = document.getElementById('reset-btn-grp');
    const resetBtnWeekly = document.getElementById('reset-btn-weekly');
    const resetBtnCatalog = document.getElementById('reset-btn-catalog');

    // --- STATE MANAGEMENT ---
    function restoreCheckboxState() {
        // Use global STORAGE_PREFIX
        checkboxes.forEach(checkbox => {
            const id = checkbox.dataset.id;
            const savedState = localStorage.getItem(STORAGE_PREFIX + id);

            if (savedState === 'true') {
                checkbox.checked = true;
            }

            // Event Listeners
            checkbox.addEventListener('change', () => {
                saveState(id, checkbox.checked);
                updateCalculations();
                triggerConfetti(checkbox);
            });
        });
    }

    function saveState(id, isChecked) {
        localStorage.setItem(STORAGE_PREFIX + id, isChecked);
    }

    // --- RESET ACTIONS ---
    function attachReset(btn, category) {
        if (!btn) return;
        btn.addEventListener('click', () => {
            let msg = '¿Reiniciar progreso de la sesión?';
            if (category === 'weekly-routine') msg = '¿Reiniciar progreso SEMANAL?';
            if (category === 'catalog') msg = '¿Reiniciar TODA la colección del catálogo?';

            if (confirm(msg)) {
                // Use global STORAGE_PREFIX
                checkboxes.forEach(cb => {
                    if (cb.dataset.category === category) {
                        cb.checked = false;
                        saveState(cb.dataset.id, false);
                    }
                });
                updateCalculations();
            }
        });
    }

    attachReset(resetBtn, 'routine');
    attachReset(resetBtnGrp, 'group-routine');
    attachReset(resetBtnWeekly, 'weekly-routine');
    attachReset(resetBtnCatalog, 'catalog');


    // Run Init
    init();
});

// ==========================================
// GLOBAL FUNCTIONS (Timers & Shared Logic)
// ==========================================
// STORAGE_PREFIX is accessible here (defined at top)

// --- CALCULATIONS ---
function updateCalculations() {
    const earningsDisplay = document.getElementById('total-earnings');
    const grpEarningsDisplay = document.getElementById('grp-earnings');
    const weeklyEarningsDisplay = document.getElementById('weekly-earnings');
    const progressBar = document.getElementById('global-progress');
    const progressText = document.getElementById('progress-text');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // --- CATALOG VARIABLES ---
    const catalogTotalEl = document.getElementById('catalog-total');
    const catalogOwnedEl = document.getElementById('catalog-owned');
    const catalogProgressFill = document.getElementById('catalog-progress-fill');
    const catalogPercentEl = document.getElementById('catalog-percent');

    let total = 0; // Routine total
    let checkedCount = 0;
    let totalCount = 0;

    let catTotalValue = 0; // Catalog Total
    let catOwnedValue = 0; // Catalog Owned

    // Determine Context
    let targetCategory = 'routine';
    if (grpEarningsDisplay) targetCategory = 'group-routine';
    if (weeklyEarningsDisplay) targetCategory = 'weekly-routine';

    checkboxes.forEach(cb => {
        const val = cb.dataset.value ? parseInt(cb.dataset.value) : 0;
        const repeats = cb.dataset.repeats ? parseInt(cb.dataset.repeats) : 1;

        // CATALOG LOGIC (Always calculate if on catalog page, or check category)
        if (cb.dataset.category === 'catalog') {
            catTotalValue += val * repeats;
            if (cb.checked) {
                catOwnedValue += val * repeats;
            }
        }

        // ROUTINE LOGIC
        if (cb.dataset.category === targetCategory) {
            totalCount++; // Counts as 1 task item regardless of repeats for progress bar
            if (cb.checked) {
                checkedCount++;
                total += val * repeats;
            }
        }
    });

    // Update Money Helper
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Update Routine Display
    if (earningsDisplay) {
        earningsDisplay.textContent = formatMoney(total);
        popElement(earningsDisplay);
    }
    if (grpEarningsDisplay) {
        grpEarningsDisplay.textContent = formatMoney(total);
        popElement(grpEarningsDisplay);
    }
    if (weeklyEarningsDisplay) {
        weeklyEarningsDisplay.textContent = formatMoney(total);
        popElement(weeklyEarningsDisplay);
    }

    // Update Catalog Display
    if (catalogTotalEl && catalogOwnedEl) {
        catalogTotalEl.textContent = formatMoney(catTotalValue);
        catalogOwnedEl.textContent = formatMoney(catOwnedValue);

        if (catTotalValue > 0) {
            const catPercent = Math.round((catOwnedValue / catTotalValue) * 100);
            if (catalogProgressFill) catalogProgressFill.style.width = `${catPercent}%`;
            if (catalogPercentEl) catalogPercentEl.textContent = `${catPercent}%`;
        }
    }

    // Update Progress (Routine)
    if (totalCount > 0 && progressBar) {
        const percentage = Math.round((checkedCount / totalCount) * 100);
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    }
}

// --- VISUALS ---
function popElement(el) {
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
}

function triggerConfetti(el) {
    // Placeholder
}


// --- REPETITION COUNTERS ---
function restoreCounters() {
    const counters = document.querySelectorAll('.task-counter');
    counters.forEach(counter => {
        const input = counter.closest('.task-item').querySelector('input[type="checkbox"]');
        if (!input) return;

        const id = input.dataset.id;
        const savedCount = localStorage.getItem(STORAGE_PREFIX + 'count_' + id);

        if (savedCount) {
            const countVal = parseInt(savedCount);
            if (countVal > 1) {
                updateCountUI(counter, input, countVal);
            }
        }
    });
}

window.updateCount = function (btn, change) {
    // Prevent event bubbling to the label (checkbox toggle)
    event.preventDefault();
    event.stopPropagation();

    const counter = btn.closest('.task-counter');
    const input = counter.closest('.task-item').querySelector('input[type="checkbox"]');

    let currentCount = input.dataset.repeats ? parseInt(input.dataset.repeats) : 1;
    let newCount = currentCount + change;

    if (newCount < 1) newCount = 1;

    updateCountUI(counter, input, newCount);

    // Save state
    localStorage.setItem(STORAGE_PREFIX + 'count_' + input.dataset.id, newCount);
    updateCalculations();
}

function updateCountUI(counter, input, count) {
    const display = counter.querySelector('.count-val');
    display.textContent = count;
    input.dataset.repeats = count;
}


// --- TIMERS ENGINE (GLOBAL) ---

window.startTimer = function (id, minutes) {
    const storageKey = STORAGE_PREFIX + 'timer_' + id;
    const existingEndTime = localStorage.getItem(storageKey);

    // TOGGLE LOGIC: If timer is running, Stop/Reset it
    if (existingEndTime && parseInt(existingEndTime) > Date.now()) {
        if (confirm('¿Detener temporizador?')) {
            localStorage.removeItem(storageKey);
            resetTimerUI(id);
        }
        return; // Exit
    }

    // START LOGIC
    const endTime = Date.now() + (minutes * 60 * 1000);
    localStorage.setItem(storageKey, endTime);
    updateTimerUI(id, endTime);
}

function restoreTimers() {
    const buttons = document.querySelectorAll('button[onclick^="startTimer"]');
    buttons.forEach(btn => {
        let id;
        // Priority 1: Data Attribute (Robust)
        if (btn.dataset.timerId) {
            id = btn.dataset.timerId;
        }
        // Priority 2: Regex (Legacy/Fallback)
        else {
            const match = btn.getAttribute('onclick').match(/'([^']+)'/);
            if (match) {
                id = match[1];
            }
        }

        if (id) {
            const endTime = localStorage.getItem(STORAGE_PREFIX + 'timer_' + id);
            if (endTime && parseInt(endTime) > Date.now()) {
                updateTimerUI(id, parseInt(endTime));
            }
        }
    });
}

function tickTimers() {
    const timerElements = document.querySelectorAll('[id^="timer-"]');
    timerElements.forEach(el => {
        const id = el.id.replace('timer-', '');
        const endTime = localStorage.getItem(STORAGE_PREFIX + 'timer_' + id);

        if (endTime) {
            const remaining = parseInt(endTime) - Date.now();
            if (remaining > 0) {
                updateTimerDisplay(id, remaining);
            } else {
                localStorage.removeItem(STORAGE_PREFIX + 'timer_' + id);
                resetTimerUI(id);
                // Notification
                sendNotification("Elite Protocol", `El temporizador ${id} ha finalizado.`);
            }
        }
    });
}

function updateTimerUI(id, endTime) {
    const btn = document.querySelector(`button[onclick*="'${id}'"]`);
    if (btn) {
        btn.textContent = 'CANCELAR';
        btn.classList.add('active');
        btn.disabled = false;
    }
    const displayWrapper = document.getElementById(`timer-${id}`);
    if (displayWrapper) {
        const display = displayWrapper.querySelector('.timer-display') || displayWrapper;
        display.classList.add('active');
    }
}

function resetTimerUI(id) {
    const btn = document.querySelector(`button[onclick*="'${id}'"]`);
    if (btn) {
        btn.disabled = false;
        btn.textContent = 'INICIAR';
        btn.classList.remove('active');
    }
    const displayWrapper = document.getElementById(`timer-${id}`);
    if (displayWrapper) {
        const display = displayWrapper.querySelector('.timer-display') || displayWrapper;
        display.classList.remove('active');

        if (display.classList.contains('timer-display')) {
            display.textContent = '00:00:00';
        } else {
            const span = displayWrapper.querySelector('span:first-child');
            if (span) span.textContent = `CD: Ready`;
        }
    }
}

function updateTimerDisplay(id, ms) {
    let displayWrapper = document.getElementById(`timer-${id}`);
    if (!displayWrapper) return;

    let display = displayWrapper.querySelector('.timer-display');
    let isMini = false;

    if (!display) {
        display = displayWrapper.querySelector('span:first-child');
        isMini = true;
    }

    if (display) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (isMini) {
            display.textContent = `${minutes}m ${seconds}s`;
        } else {
            display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

window.toggleCard = function (header) {
    const card = header.closest('.card');
    if (card) {
        card.classList.toggle('collapsed');
    }
};

// --- NOTIFICATIONS ---
function sendNotification(title, body) {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
        new Notification(title, { body: body, icon: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png' });
    }
}
