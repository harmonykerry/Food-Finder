
//api key
const apiKey = '6322a9826d293a0d63f841eb69cdb577'
const apiID = '9f02b66f'
const url = 'https://api.edamam.com/api/recipes/v2'
const url2 = 'https://api.edamam.com/search'



const content = document.getElementById('content-area')
const searchForm = document.querySelector('form')
const showSavedRecipesButton = document.querySelector('.showSavedRecipesButton')
const savedRecipesContainer = document.getElementById("savedRecipes-container");
const recipeModal = document.getElementById("recipe-modal");
const closeButtonRecipeModal = document.querySelector('.closeButton')
const fullViewRecipeModal = document.querySelector(".full-view-recipe");



const userInput = document.getElementById('searchInput')
console.log(userInput)

//favortie used 
class Favorite {
  constructor(title, image, preparationTime, ingredients, urlWebsite) {
    this.title = title
    this.image = image
    this.preparationTime = preparationTime
    this.ingredients = ingredients
    this.urlWebsite = urlWebsite
  }
}

// to add Favorite
let newMeal



savedIcon = `<svg width="1.5em" id=saveIcon height="1.5em" viewBox="0 0 16 16" class="bi bi-heart" 
             xmlns="http://www.w3.org/2000/svg"> 
                <path fill-rule="evenodd"
              d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>`


searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  searchInput = e.target.querySelector('input').value
  //call getFood
  getFood()
})



//console.log(urlToFetch)


const getFood = async () => {
   const urlToFetch = `${url}?type=public&app_id=${apiID}&app_key=${apiKey}&q=${userInput.value}`
 

  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const data = await response.json();
      console.log(data)

      displayGetFoodie(data.hits)

    }
  }
  catch (error) {
    console.log(error)
  }
}

const query = 'pizza dough'

const displayGetFoodie = async (results) => {

  let dataDisplay = ''



  results.forEach((result, i) => {
    dataDisplay += `
        <div class="card" style="width: 18rem;">
            <img src="${result.recipe.image}" class= "${i}" alt="${result.recipe.label}" onclick= "displayMeal('${i}','${result.recipe.label}','${result.recipe.image}','${result.recipe.totalTime}','${result.recipe.ingredientLines}', '${result.recipe.url}' )" href="#">
            <div class="card-body">
                <h5 class="card-title">${result.recipe.label}</h5>
                <p>${result.recipe.label}</p>
                <a href="${result.recipe.url}" target= "_blank" class="btn btn-primary">Go somewhere</a>
                
                                              
            </div>
        </div>

        `
    content.innerHTML = dataDisplay
    


  })
}

const displayMeal = (id, title, image, preparationTime, ingredients, urlWebsite) => {

  const ingredientsHtml = ingredients.split(",")

  fullViewRecipeModal.style.display = "block"
  
  recipeModal.innerHTML = ` 
          
    <div class="recipe-image">
       <img src="${image}" class="img-fluid rounded-start" alt="${title}">
    </div>

    <div class="info">
       <h4 class="meal-title">${title}</h4>
    <div class="card-body">
    <div class="saveFavoriteBtn">
        <button type="button" class="btn btn-outline-light m-4 rounded-pill" id="saveBtn" onclick= "saveFavoriteMeal('${title}','${image}','${preparationTime}', '${ingredientsHtml}', '${urlWebsite}')" >
                          ${savedIcon}
                          </button>
    </div>
    
    <div class="preparationTimeContainer">
            <h4 class="preparationTime">Preparation Time</h4>
            <p class="time">  ${preparationTime}mins</p>

    </div>
   
    <div class="ingredients-container">
        
          <h4 class="meal-ingredients">Ingredients</h4>
 
           <ul class="ingredients-list">
          ${ingredientsHtml.map(ingredient => `<li>${ingredient}</li>`).join('')}
    
   
          </ul>
      
      
   
    </div>
  </div>
</div>


   `

}




//when save button is clicked
const saveFavoriteMeal = (title, image, preparationTime, ingredients, urlWebsite) => {
  newMeal = new Favorite(title, image, preparationTime, ingredients, urlWebsite)


  const saveFavoritesBtn = document.querySelector("#saveBtn");
  
  let FavoriteMealsLocal = localStorage.getItem('FavoriteMeals') ? JSON.parse(localStorage.getItem('FavoriteMeals')) : [];


  if (FavoriteMealsLocal.some(meal => meal.title === title)) {
    saveFavoritesBtn.style.backgroundColor = 'rgb(234 10 10)';
    alert('Already in your favorite ')


  } else {
    saveFavoritesBtn.style.backgroundColor = 'rgb(234 10 10)';
    FavoriteMealsLocal.push(newMeal)
    localStorage.setItem("FavoriteMeals", JSON.stringify(FavoriteMealsLocal));

   

  }

}





/*......................................Event Listerner........................*/

//display modal when image is clicked
closeButtonRecipeModal.addEventListener("click", (e) => {
    e.preventDefault();
    if (fullViewRecipeModal.style.display === "none") {
        fullViewRecipeModal.style.display = "block"
    } else {
        fullViewRecipeModal.style.display = "none"
    }
  })







getFood()
