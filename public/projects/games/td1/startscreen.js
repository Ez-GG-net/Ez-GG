document.getElementById('mode-selector').addEventListener('click', function(event) {
    const button = event.target.closest('.mode-btn');
    if (button) {
        const mode = button.getAttribute('data-mode');
       
        reset(mode)
        // Here you would typically start the game or navigate to the next screen
    }
});