import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';

/** Global state of the app 
 *- Search object
 *- Current recipe object
 *- Shopping list object
 *- Liked recipes
*/
const state = {};

/**
 * SEARCH CONTROLLER
*/

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput(); 
    
    if(query) {
        //2) new search object and add to state
        state.search = new Search(query); 

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4) Search for recipes
            await state.search.getResults();
            clearLoader();

            //  console.log(state.search.result);
            //  console.log(state.search.result.length);

            //5) Render results on UI
            searchView.renderResults(state.search.result);
    
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader(); 
        }
    }
};

elements.searchResPages.addEventListener('click', e => {
    let btn = e.target.closest('.btn-inline');
    let goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
})

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
 


// https://www.food2fork.com/api/search
// 93176fdd50721945a0bfca3794f4dcd9


/**
 * RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#','');
    // console.log(id);

    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        // Create new recipe object
        state.recipe = new Recipe(id);
        
        // TESTING
        // window.r = state.recipe;

        try{
            // Get recipe data
            renderLoader(elements.recipeContainer);
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            // Render recipe
            // console.log(state.recipe.result());

            recipeView.renderRecipe(state.recipe.result());
            clearLoader();

        } catch (err) {
            console.log(err);
            alert('Error Processing Recipe!');
            clearLoader();
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlShoppingList = () => {
    // console.log('I am called');
    state.shoppingIngredients = state.recipe.ingredients;
    // console.log(state.shoppingIngredients);
    shoppingListView.renderList(state.shoppingIngredients);
    
}

elements.recipeContainer.addEventListener('click', e => {
     if(e.target.classList.contains('recipe__btn') || e.target.parentElement.classList.contains('recipe__btn')) {
         controlShoppingList();
         console.log('CLicked');
    }
})




























// import string from './models/Search';

// // import { add as a, multiply as m } from './views/searchView';

// import * as searchView from './views/searchView';
// console.log(`Using imported functions ${searchView.add(1,2)} and ${searchView.multiply(2,3)}. ${string}`) 


