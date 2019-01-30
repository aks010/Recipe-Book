import { elements, elementStrings } from './base';
  
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = ``;
    elements.searchResPages.innerHTML = '';
}


// Controlling the length of the Heading
function repeatStringNumTimes(str, times) {
    let repeatedString = '';
    let count = 0; 
    while(times>0 && count < 3) {
        repeatedString += str;
        times--;
        count++;
    }
    return repeatedString;
}

const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const words = title.split(" ");
        let Title = '';
        let space = limit;
        for(let i = 0 ; i < words.length ; i++) {
            if (space >= words[i].length) {
                Title += `${words[i]} `;
                space = limit - Title.length;
            } else {
                Title += repeatStringNumTimes('.', 3); 
                return Title;        
            }
        }
        return Title;
    }
    return title;
}


// Adding Recipe List to UI
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
        elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page-1 : page+1}</span>
        </button>           
`;

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);

    let button;
    if(page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if ( page < pages) {
        button = `  
                    ${createButton(page, 'prev')}
                    ${createButton(page, 'next')}
                `;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
}

export const renderResults = (recipes, page = 1 , resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    console.log(recipes.length);

    renderButton(page, recipes.length, resPerPage);
};