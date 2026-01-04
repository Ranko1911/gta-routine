document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const earningsDisplay = document.getElementById('total-earnings');
    const resetBtn = document.getElementById('reset-btn');

    // Storage Key Prefix
    const STORAGE_PREFIX = 'gta_routine_v1_';

    // Initialize State
    checkboxes.forEach(checkbox => {
        const id = checkbox.dataset.id;
        const savedState = localStorage.getItem(STORAGE_PREFIX + id);

        if (savedState === 'true') {
            checkbox.checked = true;
        }

        // Add event listener for changes
        checkbox.addEventListener('change', () => {
            saveState(id, checkbox.checked);
            updateEarnings();
            triggerAnimation(checkbox);
        });
    });

    // Initial calculation
    updateEarnings();

    // Reset Functionality
    resetBtn.addEventListener('click', () => {
        if (confirm('¿Reiniciar todas las tareas de la rutina diaria? (Los requisitos se mantendrán)')) {
            checkboxes.forEach(checkbox => {
                if (checkbox.dataset.category === 'routine') {
                    checkbox.checked = false;
                    saveState(checkbox.dataset.id, false);
                }
            });
            updateEarnings();
        }
    });

    function saveState(id, isChecked) {
        localStorage.setItem(STORAGE_PREFIX + id, isChecked);
    }

    function updateEarnings() {
        let total = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.dataset.value) {
                total += parseInt(checkbox.dataset.value);
            }
        });

        // Format currency
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(total);

        earningsDisplay.textContent = formatted;

        // Add a pop effect to the text
        earningsDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            earningsDisplay.style.transform = 'scale(1)';
        }, 200);
    }

    function triggerAnimation(checkbox) {
        // Optional: Add sound effect or confetti here if requested
        // For now, simple visual feedback is handled by CSS
    }
});
