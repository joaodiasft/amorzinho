document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            themeIcon.src = 'day-mode.png';
            themeIcon.alt = 'Modo Claro';
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeIcon.src = 'night-mode.png';
            themeIcon.alt = 'Modo Noturno';
        }
    }
    
    setTheme(prefersDark.matches);

    themeToggle.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark-mode'));
    });
    
    prefersDark.addEventListener('change', (e) => setTheme(e.matches));

    // --- Countdown Timer ---
    const startDate = luxon.DateTime.fromISO('2021-01-01T09:00:00');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = luxon.DateTime.now();
        const diff = now.diff(startDate, ['days', 'hours', 'minutes', 'seconds']);
        
        daysEl.textContent = Math.floor(diff.days);
        hoursEl.textContent = Math.floor(diff.hours);
        minutesEl.textContent = Math.floor(diff.minutes);
        secondsEl.textContent = Math.floor(diff.seconds);
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- SPA Navigation ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            pages.forEach(page => {
                if (`#${page.id}` === targetId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
            window.scrollTo(0, 0);
        });
    });

    // --- Floating Hearts ---
    const heartsContainer = document.getElementById('hearts-container');
    const numHearts = 15;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 10 + 15}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heartsContainer.appendChild(heart);
    }
    
    // --- Dreams List ---
    const dreamItems = document.querySelectorAll('.dream-item');
    dreamItems.forEach(item => {
        item.addEventListener('click', () => {
            const isDone = item.getAttribute('data-done') === 'true';
            item.setAttribute('data-done', !isDone);
        });
    });

    // --- Love Click Interaction ---
    document.querySelectorAll('.love-click').forEach(element => {
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            confetti({
                particleCount: 50,
                spread: 50,
                origin: { x, y },
                colors: ['#f8b1c4', '#fde2e8', '#a7d8de', '#ffffff'],
                shapes: ['circle', 'heart']
            });
        });
    });

});

