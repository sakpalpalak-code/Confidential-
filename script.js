document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const animationContainer = document.getElementById('animation-container');

    let isRevealed = false;

    // --- Button Dodging Logic ---
    function moveNoButton() {
        // Switch to absolute positioning once interaction starts
        noBtn.style.position = 'fixed';
        
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Ensure the button stays within the viewport padding
        const maxX = window.innerWidth - btnWidth - 20;
        const maxY = window.innerHeight - btnHeight - 20;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }

    // Trigger move on desktop (hover) and mobile (touch)
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents accidental clicking on mobile
        moveNoButton();
    });

    // --- Page Navigation ---
    yesBtn.addEventListener('click', () => {
        isRevealed = true;
        
        // Fade out page 1
        page1.classList.remove('active');
        
        setTimeout(() => {
            page1.classList.add('hidden');
            page2.classList.remove('hidden');
            
            // Allow a tiny delay for display:none to clear before adding opacity
            setTimeout(() => {
                page2.classList.add('active');
            }, 50);
        }, 1000); // Matches the CSS transition time
    });

    // --- Audio Controls ---
    let isPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🎵 Play Music';
        } else {
            bgMusic.play();
            musicToggle.textContent = '⏸ Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // --- Visual Effects ---
    function createEffect() {
        const el = document.createElement('div');
        
        // If we are on Page 2, mix hearts and sparkles. Otherwise, just hearts.
        const isSparkle = isRevealed && Math.random() > 0.5;
        
        el.classList.add(isSparkle ? 'sparkle' : 'heart');
        el.innerHTML = isSparkle ? '✨' : '💖';
        
        el.style.left = Math.random() * 100 + 'vw';
        
        // Randomize duration
        const duration = Math.random() * 3 + 3; // 3 to 6 seconds
        el.style.animationDuration = duration + 's';
        
        // Start lower for hearts, random height for sparkles
        if (isSparkle) {
            el.style.top = Math.random() * 100 + 'vh';
        }
        
        animationContainer.appendChild(el);
        
        // Clean up DOM
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    }

    // Generate effects continuously
    setInterval(createEffect, 400);
});
