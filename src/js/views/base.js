export const elements = {
    searchField: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    resultsList: document.querySelector('.results__list'),
    resultsPane: document.querySelector('.results'),
    resultsEnd: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesList: document.querySelector('.likes__list'),
    likesMenu: document.querySelector('.likes__field'),
}  

export const elementStrings = {
    loader: 'loader',
}

export const renderLoader = parent =>{
    const loader = `
    <div class="${elementStrings.loader}">
    <svg>
        <use href="img/icons.svg#icon-cw"></use>
    </svg>
    </div>`
    parent.insertAdjacentHTML('afterbegin',loader);
}

export const removeLoader = () =>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}
