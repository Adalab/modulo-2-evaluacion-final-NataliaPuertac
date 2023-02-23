'use strict';

//Llamo a las constantes del html

const writeCocktail = document.querySelector('.js-write-cocktail');
const searchBtn = document.querySelector('.js-search');
const resetBtn = document.querySelector('.js-reset');
const cocktailList = document.querySelector('.js-cocktail-list');
const favoriteList = document.querySelector('.js-favorite-list');

//creo una constante para la url para acortar.

let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

//creo dos array para meter los cócteles

let allDrinkList = [];
let favoriteDrinks = [];

//Fetch para obtener los datos de la API

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    allDrinkList = data.drinks;
    renderCocktelsList(allDrinkList);
  });

//funcion para pintar todos los cócteles en la lista

function renderCocktelsList(allDrinkList) {
  cocktailList.innerHTML = '';
  for (const cocktail of allDrinkList) {
    cocktailList.innerHTML += renderCocktails(cocktail);
  }
}

//Pintar un cóctel de la lista

function renderCocktails(cocktail) {
  let html = `<li>
        <article id=${cocktail.idDrink}>
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        <img src="${cocktail.strDrinkThumb}" alt="foto de cóctel">
        </article>
    </li> `;
  return html;
}

//función de buscar un cóctel

function handleClickSearch(ev) {
  ev.preventDefault();
  console.log('entro');
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${writeCocktail.value}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      allDrinkList = data.drinks;
      renderCocktelsList(allDrinkList);
    });
}

//eventos

searchBtn.addEventListener('click', handleClickSearch);
