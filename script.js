document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATION ---
    function init() {
        restoreCheckboxState();
        restoreTimers(); // Restores UI for running timers
        updateCalculations();

        // Start Global Ticker
        setInterval(tickTimers, 1000);
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const resetBtn = document.getElementById('reset-btn');
    const resetBtnGrp = document.getElementById('reset-btn-grp');

    // --- STATE MANAGEMENT ---
    function restoreCheckboxState() {
        const STORAGE_PREFIX = 'gta_elite_v26_';
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
        const STORAGE_PREFIX = 'gta_elite_v26_';
        localStorage.setItem(STORAGE_PREFIX + id, isChecked);
    }

    // --- RESET ACTIONS ---
    function attachReset(btn, category) {
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (confirm('¿Reiniciar progreso de la sesión?')) {
                const STORAGE_PREFIX = 'gta_elite_v26_';
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

    // Run Init
    init();
});

// ==========================================
// GLOBAL FUNCTIONS (Timers & Shared Logic)
// ==========================================

const STORAGE_PREFIX = 'gta_elite_v26_';

// --- CALCULATIONS (Exposed if needed, but mostly internal to DOMContentLoaded via event listeners) ---
function updateCalculations() {
    const earningsDisplay = document.getElementById('total-earnings');
    const grpEarningsDisplay = document.getElementById('grp-earnings');
    const progressBar = document.getElementById('global-progress');
    const progressText = document.getElementById('progress-text');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    let total = 0;
    let checkedCount = 0;
    let totalCount = 0;

    // Determine Context
    const isGroupPage = !!grpEarningsDisplay;
    const targetCategory = isGroupPage ? 'group-routine' : 'routine';

    checkboxes.forEach(cb => {
        if (cb.dataset.category === targetCategory) {
            totalCount++;
            if (cb.checked) {
                checkedCount++;
                if (cb.dataset.value) {
                    total += parseInt(cb.dataset.value);
                }
            }
        }
    });

    // Update Money
    const formattedMoney = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(total);

    if (earningsDisplay) {
        earningsDisplay.textContent = formattedMoney;
        popElement(earningsDisplay);
    }
    if (grpEarningsDisplay) {
        grpEarningsDisplay.textContent = formattedMoney;
        popElement(grpEarningsDisplay);
    }

    // Update Progress
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
        const match = btn.getAttribute('onclick').match(/'([^']+)'/);
        if (match) {
            const id = match[1];
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
            }
        }
    });
}

function updateTimerUI(id, endTime) {
    const btn = document.querySelector(`button[onclick*="'${id}'"]`);
    if (btn) {
        // Change button to "Cancel" state
        btn.textContent = 'CANCELAR';
        btn.classList.add('active');
        // We DON'T disable it anymore, so it can be clicked to cancel
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
            // Mini timer reset
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
