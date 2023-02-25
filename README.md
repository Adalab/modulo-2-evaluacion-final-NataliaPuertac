# Buscador de cócteles

## Descripción del proyecto:

> El proyecto consiste en desarrollar una aplicación web que contiene un listado de las bebidas y cócteles de todo el mundo, que nos permite marcar y desmarcar las bebidas como favoritas y guardarlas en local storage.

## Estructura básica de la página:

La aplicación de búsqueda de cócteles consta de dos partes:

- Un campo de texto y dos botones: uno para buscar un cóctel por su nombre y otro para resetear la página.
- Un listado de resultados de búsqueda donde aparece la imagen del cóctel y el nombre.

## Buscar:

- Al hacer clic sobre el botón de buscar, la aplicación se conecta al API abierto de TheCocktailDB.
- Por cada cóctel contenido en el resultado de la búsqueda se pinta una tarjeta donde se muestra la imagen del cóctel y su nombre. En el caso de que alguno de los cócteles que devuelve el API no tenga imagen, se mostrará una imagen de relleno con el servicio de placeholder.com.

## Favoritos:

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuál es su cóctel favorito. Para ello, al hacer clic sobre un cóctel pasa lo siguiente:

- El elemento seleccionado se resalta en verde en la lista de cócteles indicando que es uno de los favoritos.
- El coctel elegido se muestra en la lista de favoritos de la parte derecha de la pantalla.
  Para eliminar un cóctel de la lista de favoritos es tan sencillo como pinchar sobre él de nuevo desde la lista general de cócteles o pinchar sobre la x de la lista de favoritos.

## Para contruir esta página se ha usado:

1. HTML
2. SCSS
3. JAVASCRIPT
4. VSC
5. BEM
6. GITHUB
7. GULP
8. ADALAB WEB STARTER KIT
9. NPM
