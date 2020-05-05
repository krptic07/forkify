import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const renderLike = (item) => {
    const markup = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.img}" alt="${item.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(item.title)}</h4>
                    <p class="likes__author">${item.author}</p>
                </div>
            </a>
        </li>
    `
    elements.likesList.insertAdjacentHTML('beforeend',markup);
}

export const removeLike = (id) => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`);

    el.parentElement.removeChild(el);

}

export const toggleLikeButton = (isLiked) => {
   const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
   document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = (numOfLikes) => {
    elements.likesMenu.style.visibility = numOfLikes>0 ? 'visible' : 'hidden';
}
