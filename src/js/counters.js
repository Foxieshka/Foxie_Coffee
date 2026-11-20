export function initCounters(){
    const counters = document.querySelectorAll('.stat__num');
    if (!counters.length) return;
    // Функция, которая плавно накручивает 1 счетчик    
    function animateCounter(el) {
        const target = Number(el.dataset.count);   // 500
        const duration = 2000;                     // 2 секунды
        const start = performance.now();           // время старта

        function step(now){
            // сколько времени прошло с момента старта
            const elapsed = now - start;
            // прогресс от 0 до 1
            const progress = Math.min(elapsed / duration, 1);
            // сглаживание
            const eased = 1 - Math.pow(1 - progress, 3);
            // Текущее значение = target * progress
            el.textContent = Math.floor(target * eased);

            if(progress < 1){
                requestAnimationFrame(step); // Если не дошли - продолжаем
            }else{
                el.textContent = target; // Останавливаем анимацию
            }            
        }

        requestAnimationFrame(step);
    }
    // Наблюдатель: запустит анимацию именно в тот момент, 
    // когда счетчик виден    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(!entry.isIntersecting) return;
            animateCounter(entry.target);
            observer.unobserve(entry.target); // Сработает 1 раз
        });
    }, {threshold: 0.5});

    counters.forEach((el) => observer.observe(el));
}