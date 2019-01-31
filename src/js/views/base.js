export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    
    recipeContainer: document.querySelector('.recipe'),
}

export const elementStrings = {
    loader: 'loader',
    ResBtn: 'results__btn--prev',
    recipeIngredientList: '.recipe__ingredient-list',
}

export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    document.querySelector(`.${elementStrings.loader}`).remove();
}