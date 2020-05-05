import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements,renderLoader,removeLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if(query){
        //2) New search object and add to state
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.resultsPane);
        //4) Search for recipes
        try{
            await state.search.getResult();
            removeLoader();
            //5) Update the UI
            searchView.renderResults(state.search.result);
        }catch(error){
            alert('Something went wrong!');
            removeLoader();
        }

       
    }
}

elements.searchForm.addEventListener('submit',el => {
    el.preventDefault();
    controlSearch();
})

elements.resultsEnd.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
     
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {

    const id = window.location.hash.replace('#','');
    if(id){
        
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        searchView.highlightSelected(id);
        state.recipe = new Recipe(id);

        try{
            await state.recipe.getRecipe();
            
            state.recipe.getTime();
            state.recipe.getServings();
            state.recipe.parseIngredients();

            removeLoader();
            recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
            // console.log(state.recipe.ingredients);

            
        }
        catch(error){
            console.log(error);
        }
    }
}

['load','hashchange'].forEach(el => window.addEventListener(el,controlRecipe));


const controlList = () => {
    if (!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
    });


}

//Handling recipe button clicks

elements.recipe.addEventListener('click',e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *') && state.recipe.servings>1 ){
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
        
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }
})

//Handling list delete and update buttons

elements.shoppingList.addEventListener('click',e =>{
    const itemId = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(itemId);
        listView.deleteItem(itemId);
        
    }
    else if (e.target.matches('.shopping__count-value')){
        const newCount = parseFloat(e.target.value,10);
        state.list.updateCount(itemId, newCount);
        
    }

})

// Likes Controller


const controlLikes  = () => {
    if(!state.likes) state.likes = new Likes();
    const curId = state.recipe.id;
    if(!state.likes.isLiked(curId)){

        const item = state.likes.addLike(curId,state.recipe.image,state.recipe.title,state.recipe.author);
        likesView.toggleLikeButton(true);
        likesView.renderLike(item);


    }
    else{
        state.likes.deleteLike(curId);
        likesView.toggleLikeButton(false);
        likesView.removeLike(curId);

    }

    likesView.toggleLikeMenu(state.likes.getNumOfLikes());
}

window.addEventListener('load',()=>{
    state.likes = new Likes();
    state.likes.renderData();
    state.likes.likes.forEach(like => likesView.renderLike(like));
    likesView.toggleLikeMenu(state.likes.getNumOfLikes());
})
