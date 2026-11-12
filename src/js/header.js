export function initHeader(){
    const burger = document.querySelector(".header__burger");
    const nav = document.querySelector(".header__nav");
    const close = document.querySelector(".header__close");
    if (!burger || !nav || !close) return;

    const setOpen = (isOpen) => {
        nav.classList.toggle('is-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
    } 

    setOpen(false); // Стартовое состояние
    burger.addEventListener('click', () => setOpen(true));
    close .addEventListener('click', () => setOpen(false));
    // Клик по ссылке внутри меню закрывает его (на мобилке)
    nav.addEventListener('click', (e) => {
        if (e.target.closest('a')) setOpen(false);
    });
}