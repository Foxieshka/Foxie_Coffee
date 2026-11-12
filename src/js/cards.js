import { products } from './data.js';

const cardTemplate = document.querySelector("#card-template");

function createCard(product){
    // cloneNode(true) - копия со всем содержимым шаблона
    const fragment = cardTemplate.content.cloneNode(true);
    // Заполняем фрагмент данными
    fragment.querySelector(".card__title").textContent = product.title;
    fragment.querySelector(".card__text").textContent = product.text;
    // Вставляем изображение
    const img = fragment.querySelector(".card__img");
    img.src = product.img;
    img.alt = product.title; // alt = название товара
    // Сохраняем в датасете id товара
    const btn = fragment.querySelector('.card__btn');
    btn.dataset.id = product.id;
    // Вовзвращаем содержимое фрагмента
    return fragment;
}

export function initCards(){
    const list = document.querySelector("#cards-list");
    if (!list) return; // безопасно, если блока нет

    // replaceChildren убирает старые узлы и вставляет новые за один вызов
    list.replaceChildren(...products.map(createCard));

    // Делегирование: один обработчик на весь список
    list.addEventListener('click', (e) => {
        const btn = e.target.closest('.card__btn');
        if (!btn) return;
        const id = Number(btn.dataset.id);
        const product = products.find((p) => p.id === id);
        alert(`Заказано: ${product.title} 🦊`);
        // сюда потом пойдёт логика корзины/модалки
  });
} 