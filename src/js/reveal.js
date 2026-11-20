export function initReveal() {
    // Находим все элементы с атрибутом data-animate
    const features = document.querySelectorAll('[data-animate]');

    // Если браузер не поддерживает IO — просто показываем всё.
    // (старые браузеры, но это скорее подстраховка)
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    // Создаем наблюдателя, который следит за видимостью
    /* В скобках передаем функцию, которая будет вызываться, 
    когда наблюдатель обнаружит изменения. Функция получает 
    entries — список элементов, которые «пересекли границу 
    видимости*/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                // Если элемент попал в зону видимости
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, 
    {
        rootMargin: '0px 0px 30px 0px', // чуть "позже" момента появления
    }
    );
    // Говорим наблюдателю следить за каждым элементом
    features.forEach((feature) => observer.observe(feature));
}