import { elements } from './base'

export const clearList = () => {
    elements.shoppingList.innerHTML = '';
}

export const renderList = (ingredients) => {
    let markup = '';

    ingredients.forEach( ingredient => {
        markup +=     
            `
            <li class="shopping__item">
                <div class="shopping__count">
                    <input type="number" value=${ingredient.count} step="100">
                    <p>${ingredient.unit}</p>
                </div>
                <p class="shopping__description">${ingredient.ingredient}</p>
                <button class="shopping__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
            `
        
    });
    elements.shoppingList.insertAdjacentHTML("afterbegin", markup);
}

export const deteleItem = target => {
    // console.log(target);
    target.parentElement.remove();
}