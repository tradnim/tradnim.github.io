document.addEventListener('DOMContentLoaded', () => {
    // Add terminal typing effect to header
    const header = document.querySelector('h1');
    header.innerHTML = '';
    const headerText = 'MTech Solutions';
    let i = 0;
    
    const typeHeader = () => {
        if (i < headerText.length) {
            header.innerHTML += headerText.charAt(i);
            i++;
            setTimeout(typeHeader, 100);
        }
    };
    
    typeHeader();

    // Add terminal-like interaction
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.borderColor = '#00ff88';
            setTimeout(() => {
                card.style.borderColor = 'var(--terminal-green)';
            }, 300);
        });
    });
});