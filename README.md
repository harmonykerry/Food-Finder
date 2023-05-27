### Recipes Search
Recipes search website with a simple UI, built with JavaScript, using EDAMAM Search API for recipes.


## Project Link

Click [here](https://harmonykerry.github.io/Food-Finder/) to view the project on GitHub pages.

## Foodies Walkthrough Video
Food Walkthrough(https://youtu.be/huDHA3h1Vks)


## API Used

Recipes are provided by the Edamam Recipe Search API (https://developer.edamam.com/edamam-recipe-api)

Current Edamam Recipe API service which is being used is the free developer package which provides:

10,000 API calls/month
10 throttling calls/minute
An API call request to the Recipe Search API is made in two cases:

User types a recipe/food/ingredient name and clicks search button/press the Enter Key
Recipes are fetched from this URL which requires a query and id + key of the registered package account (`${url}?type=public&app_id=${apiID}&app_key=${apiKey}&q=${userInput.value}`)

Favorite recipes are stored in localStorage 
User can also click on save ingredients to Shopping list


