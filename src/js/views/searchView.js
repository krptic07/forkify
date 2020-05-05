import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const clearInput = () => 
{
    elements.searchField.value = '';
} 

export const clearResult = () =>{
    elements.resultsList.innerHTML = '';
    elements.resultsEnd.innerHTML = '';
}

export const highlightSelected = id =>{
    const allItems = Array.from(document.querySelectorAll('.results__link'));
    allItems.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title,limit = 17) => {
    const newTitle = [];
    if (title.length > 17){
        title.split(' ').reduce((acc,cur) =>{
            if (acc + cur.length <=17 ){
                newTitle.push(cur)
            }
            return acc + cur.length
        },0)
    return `${newTitle.join(' ')}...`;
    }
    return title     
}

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>`;
    elements.resultsList.insertAdjacentHTML('beforeend',markup)
}

const createButtons = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;



const renderButtons = (page,numResults,resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let button;

    if (page === 1 && pages>1){
        button = createButtons(page,'next');
    }
    else if(page<pages){
        button = `
        ${createButtons(page,'prev')}
        ${createButtons(page,'next')}
        `
    }
    else if(page === pages && pages>1){
        button = createButtons(page,'prev');
    }
    elements.resultsEnd.insertAdjacentHTML('afterbegin',button);
}


export const renderResults = (recipes,page=1,resPerPage=10) => {
    const start = (page-1)*resPerPage;
    const end = (page)*resPerPage;

    recipes.slice(start,end).forEach(renderRecipe);

    renderButtons(page,recipes.length,resPerPage);
}


