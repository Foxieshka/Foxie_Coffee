// src/js/parallax.js
export function initHeroParallax() {
    // Отключаем на мобилке (≤ 768px) и при «уменьшить движение»
    if (
    window.matchMedia('(width <= 768px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return;
    }
    const hero = document.querySelector('.hero__banner');
    if (!hero) return;
    // Скорость: чем меньше, тем медленнее движется фон
    const speed = 0.4;
    let ticking = false;

    const update = () => {
        // Смотрим, сколько пользователь проскроллил ( в пикселях )
        const scrolled = window.scrollY;
        // Сдвигаем background-position по Y
        const yPos = scrolled * speed;
        // Применяем
        hero.style.backgroundPosition = `center ${yPos - 80}px`;    
        ticking = false;
    };

    window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
    }
    }, { passive: true });

    // Первый вызов при загрузке
    update();
}