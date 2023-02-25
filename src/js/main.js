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

//recuperar datos de la lista de favoritos desde el local storage
const cocktelsFavorites = JSON.parse(localStorage.getItem('favoritos'));
if (cocktelsFavorites) {
  favoriteDrinks = cocktelsFavorites;
  renderFavoriteList(favoriteDrinks);
}

//Fetch para obtener los datos de la API en la lista general
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allDrinkList = data.drinks;
    renderCocktelsList(allDrinkList);
  });

//funcion para pintar todos los cócteles en la lista
function renderCocktelsList(allDrinkList) {
  cocktailList.innerHTML = '';
  for (const cocktail of allDrinkList) {
    cocktailList.innerHTML += renderCocktails(cocktail);
  }
  addEventToCocktail();
  removeAddSelected();
}

//función para pintar todos los cócteles de la lista de favoritos
function renderFavoriteList(favoriteDrinks) {
  favoriteList.innerHTML = '';
  for (const cocktail of favoriteDrinks) {
    // cocktail.strDrinkThumb = '';
    let imgCoctel = '';
    if (!cocktail.strDrinkThumb) {
      imgCoctel = `https://via.placeholder.com/300x400/41c737/def7f6.png?text=Sin+fotografía`;
    } else {
      imgCoctel = cocktail.strDrinkThumb;
    }
    favoriteList.innerHTML += `<li class="listFinal"><section>
        <article class="js-li-favorite-cocktail" id=${cocktail.idDrink}>
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        <img class="cocktailImg" src="${imgCoctel}" alt="foto de cóctel">
        </article>
        </section>
        <input type="button" class="btnClose js-btnClose" value="X" id=${cocktail.idDrink}>
    </li> `;
  }
  removeFavorite();
  localStorage.setItem('favoritos', JSON.stringify(favoriteDrinks)); //guardar en el local storage la lista de mis favoritos
}

//Pintar un cóctel de la lista
function renderCocktails(cocktail) {
  // cocktail.strDrinkThumb = '';
  let imgCoctel = '';
  if (!cocktail.strDrinkThumb) {
    imgCoctel = `https://via.placeholder.com/300x400/41c737/def7f6.png?text=Sin+fotografía`;
  } else {
    imgCoctel = cocktail.strDrinkThumb;
  }

  let html = `<li class="listFinal"><section>
        <article class="js-li-cocktail" id=${cocktail.idDrink}>
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        <img class="cocktailImg" src="${imgCoctel}" alt="foto de cóctel">
        </article>
        </section>
    </li> `;
  return html;
}

//función de buscar un cóctel
function handleClickSearch(ev) {
  ev.preventDefault();
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${writeCocktail.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      allDrinkList = data.drinks;
      renderCocktelsList(allDrinkList);
    });
}

//función para seleccionar un li de la lista de cócteles.
function handleClickLi(ev) {
  console.log(ev.currentTarget.id);
  const idSelected = ev.currentTarget.id;
  console.log(ev.currentTarget);
  const selectedCocktail = allDrinkList.find(
    (cocktail) => cocktail.idDrink === idSelected
  );
  const indexCocktail = favoriteDrinks.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  console.log(indexCocktail);
  if (indexCocktail === -1) {
    ev.currentTarget.classList.add('selected');
    favoriteDrinks.push(selectedCocktail);
  } else {
    ev.currentTarget.classList.remove('selected');
    favoriteDrinks.splice(indexCocktail, 1);
  }
  renderFavoriteList(favoriteDrinks);
}

//función para hacer click en casa uno de los li
function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktail');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClickLi);
  }
}

//función para resetar
function handleClickReset(ev) {
  ev.preventDefault();
  writeCocktail.value = '';
  favoriteList.innerHTML = '';
  localStorage.removeItem('favoritos');
  location.reload();
}

// funcion para el btn de remove favorites
function handleRemoveFavorite(ev) {
  ev.preventDefault();
  const idSelected = ev.currentTarget.id;
  const indexCocktail = favoriteDrinks.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  favoriteDrinks.splice(indexCocktail, 1);
  renderFavoriteList(favoriteDrinks);
  removeAddSelected();
}

// Pinchar sobre el botón
function removeFavorite() {
  const buttonClose = document.querySelectorAll('.js-btnClose');
  for (const closeBtn of buttonClose) {
    closeBtn.addEventListener('click', handleRemoveFavorite);
  }
}

//Quitar lo seleccionado o añadirlo si quitamos el favorito desde la lista de los favoritos con in botón
function removeAddSelected() {
  const allLi = document.querySelectorAll('.js-li-cocktail');
  console.log(allLi);
  for (let item1 of allLi) {
    const findCocktel = favoriteDrinks.find(
      (item) => item.idDrink === item1.id // pongo idDrink porque lo traigo del array del objeto e id porque lo cojo del html.
    );
    console.log(item1);
    console.log(findCocktel);
    if (findCocktel) {
      item1.classList.add('selected');
    } else {
      item1.classList.remove('selected');
    }
  }
}

//evento de búsqueda
searchBtn.addEventListener('click', handleClickSearch);
resetBtn.addEventListener('click', handleClickReset);
