"use strict";const writeCocktail=document.querySelector(".js-write-cocktail"),searchBtn=document.querySelector(".js-search"),resetBtn=document.querySelector(".js-reset"),cocktailList=document.querySelector(".js-cocktail-list"),favoriteList=document.querySelector(".js-favorite-list");let url="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",allDrinkList=[],favoriteDrinks=[];const cocktelsFavorites=JSON.parse(localStorage.getItem("favoritos"));function renderCocktelsList(e){cocktailList.innerHTML="";for(const t of e)cocktailList.innerHTML+=renderCocktails(t);addEventToCocktail(),removeAddSelected()}function renderFavoriteList(e){favoriteList.innerHTML="";for(const t of e){let e="";e=t.strDrinkThumb?t.strDrinkThumb:"https://via.placeholder.com/300x400/41c737/def7f6.png?text=Sin+fotografía",favoriteList.innerHTML+=`<li class="listFinal"><section>\n        <article class="js-li-favorite-cocktail" id=${t.idDrink}>\n        <h3 class="cocktail_title">${t.strDrink}</h3>\n        <img class="cocktailImg" src="${e}" alt="foto del cóctel">\n        </article>\n        </section>\n        <input type="button" class="btnClose js-btnClose" value="X" id=${t.idDrink}>\n    </li> `}removeFavorite(),localStorage.setItem("favoritos",JSON.stringify(e))}function renderCocktails(e){let t="";return t=e.strDrinkThumb?e.strDrinkThumb:"https://via.placeholder.com/300x400/41c737/def7f6.png?text=Sin+fotografía",`<li class="listFinal"><section>\n        <article class="js-li-cocktail" id=${e.idDrink}>\n        <h3 class="cocktail_title">${e.strDrink}</h3>\n        <img class="cocktailImg" src="${t}" alt="foto del cóctel">\n        </article>\n        </section>\n    </li> `}function handleClickSearch(e){e.preventDefault(),url="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+writeCocktail.value,fetch(url).then(e=>e.json()).then(e=>{console.log(e),allDrinkList=e.drinks,renderCocktelsList(allDrinkList)})}function handleClickLi(e){console.log(e.currentTarget.id);const t=e.currentTarget.id;console.log(e.currentTarget);const i=allDrinkList.find(e=>e.idDrink===t),r=favoriteDrinks.findIndex(e=>e.idDrink===t);console.log(r),-1===r?(e.currentTarget.classList.add("selected"),favoriteDrinks.push(i)):(e.currentTarget.classList.remove("selected"),favoriteDrinks.splice(r,1)),renderFavoriteList(favoriteDrinks)}function addEventToCocktail(){const e=document.querySelectorAll(".js-li-cocktail");for(const t of e)t.addEventListener("click",handleClickLi)}function handleClickReset(e){e.preventDefault(),writeCocktail.value="",favoriteList.innerHTML="",localStorage.removeItem("favoritos"),location.reload()}function handleRemoveFavorite(e){e.preventDefault();const t=e.currentTarget.id,i=favoriteDrinks.findIndex(e=>e.idDrink===t);favoriteDrinks.splice(i,1),renderFavoriteList(favoriteDrinks),removeAddSelected()}function removeFavorite(){const e=document.querySelectorAll(".js-btnClose");for(const t of e)t.addEventListener("click",handleRemoveFavorite)}function removeAddSelected(){const e=document.querySelectorAll(".js-li-cocktail");console.log(e);for(let t of e){const e=favoriteDrinks.find(e=>e.idDrink===t.id);console.log(t),console.log(e),e?t.classList.add("selected"):t.classList.remove("selected")}}cocktelsFavorites&&(favoriteDrinks=cocktelsFavorites,renderFavoriteList(favoriteDrinks)),fetch(url).then(e=>e.json()).then(e=>{allDrinkList=e.drinks,renderCocktelsList(allDrinkList)}),searchBtn.addEventListener("click",handleClickSearch),resetBtn.addEventListener("click",handleClickReset);