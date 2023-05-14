let favoriteListPanel = document.getElementById("favoriteListPanel")
let main = document.querySelector(".main")
let shoppingListMain = document.getElementById("shoppingListMain");


//api key
const apiKey = "6322a9826d293a0d63f841eb69cdb577";
const apiID = "9f02b66f";
const url = "https://api.edamam.com/api/recipes/v2";

const FavoriteMealsLocal = JSON.parse(localStorage.getItem('FavoriteMeals')) || []

const shoppingListLocal = localStorage.getItem('shoppingList') ? JSON.parse(localStorage.getItem('shoppingList')) : [];



const displayFavoriteCardMeal = (meal) => {
    const div = document.createElement('div')
    div.className = 'cardFavoriteMeal'

    div.append(displayHeader(meal))
    div.append(displayImage(meal))
    div.append(displayWebsite(meal))
    div.append(displayIngredientList(meal))

    main.append(div)

}

const displayHeader = (meal) => {
    const h1 = document.createElement('h1');
    h1.innerText = meal.title;
    h1.className = 'favoriteMealTitle';

    // main.appendChild(h1);

    return h1;
};


const displayImage = (meal) => {
    const image = document.createElement('img');
    image.src = meal.image;
    // main.appendChild(image);

    return image;
}


const displayWebsite = (meal) => {

    const container = document.createElement('div');
    container.classList = 'containerWebsiteAndBtn'

    const hyperLinkTag = document.createElement("a");
    hyperLinkTag.setAttribute("id", "linkToWebsite");
    hyperLinkTag.setAttribute("href", `${meal.urlWebsite}`);
    hyperLinkTag.setAttribute("target", "_blank")
    hyperLinkTag.textContent = " Go to Full Recipe"


    const button = document.createElement('button');
    button.className = 'removeFavoriteMealButton';
    button.innerText = 'X';
    removeFavoriteMeal(button, `${meal.urlWebsite}`)

    container.appendChild(hyperLinkTag)
    container.appendChild(button)

    return container
    //main.append(container);
}

const ingredientToElement = (meal) => {
    const li = document.createElement('li');
    li.className = 'ingredient_list';
    const ingredientArray = meal.ingredients.split(",")
    li.textContent = ingredientArray.map(ingredient => ingredient.trim()).join(", ");
    return li

}



const displayIngredientList = (meal) => {
    const ul = document.createElement('ul');
    ul.className = 'ingredient_list';

    const ingredients = meal.ingredients.split(",");
    const liElements = ingredients.map(ingredient => ingredientToElement({ ingredients: ingredient.trim() }));


    //foreach ingredient add button to the lists before the Ul
    liElements.forEach(addIngredientButton)
    liElements.forEach(li => ul.appendChild(li));
    //main.append(ul);
    //return ul;

    return ul
}

const addIngredientButton = (ingredient) => {
    const button = document.createElement('button');

    button.className = 'ingredientButton';
    button.innerText = '+';


    ingredient.append(button);
    addIngredientEvent(button)
}

//add ingredient to shopping list
const addIngredientEvent = (button) => {

    button.onclick = function (event) {
        button.style.backgroundColor = '#9dd39d';
        const ingredient = event.target.parentNode.textContent.trim().replace('+', '');

        // Check if the ingredient is already in the shopping list
        if (shoppingListLocal.includes(ingredient)) {
            alert(`already in the shopping list!`);
            return;
        }

        shoppingListLocal.push(ingredient);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingListLocal));
        displayGroceryList();
    }
}

//SHOPPING LIST
const displayShoppingListHeader = () => {
    const h2 = document.createElement('h2');
    h2.innerText = "Shopping List"
    h2.className = 'shopping-list';
    shoppingListMain.append(h2)

}


const displayGroceryList = () => {
    const ul = document.createElement('ul');
    ul.className = 'shopping_list';

    const liElements = shoppingListLocal.map((ingredient, index) => {
        const li = document.createElement('li');
        li.className = 'shopping_list';
        li.textContent = ingredient;
        li.id = index

        addRemoveButton(li);
        return li;
    });

    liElements.forEach(li => ul.append(li));

    //seems to be duplicating 

    // Remove the previous list before creating a new one

    const previousList = document.querySelector('.shopping_list');
    if (previousList) {
        previousList.remove();
    }
    shoppingListMain.append(ul)

}

const addRemoveButton = (ingredient) => {
    const minusButton = document.createElement('button');
    minusButton.className = 'removeShoppingList'

    minusButton.innerText = '-';
    createRemoveEvent(minusButton, ingredient);

    ingredient.append(minusButton);

    return minusButton;
}

const createRemoveEvent = (button, li) => {

    button.onclick = function () {
        removeIngredient(li, button);


    };
}



const removeIngredient = (ingredient, button) => {

    const shoppingListItem = button.closest('.shopping_list');


    const index = shoppingListLocal.indexOf(ingredient.textContent.replace('-', ''));


    if (index !== -1) {
        shoppingListLocal.splice(index, 1);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingListLocal));
        shoppingListItem.remove()
    }


}


const removeFavoriteMeal = (button, urlWebsite, target) => {



    button.onclick = function () {
        console.log('removeFavoriteMeal called');
        const cardFavoriteMeal = button.closest('.cardFavoriteMeal');
        console.log(cardFavoriteMeal);
        const index = FavoriteMealsLocal.findIndex(item => item.urlWebsite === urlWebsite);
        if (index !== -1) {
            FavoriteMealsLocal.splice(index, 1)
            localStorage.setItem('FavoriteMeals', JSON.stringify(FavoriteMealsLocal));
         
            cardFavoriteMeal.remove();
        }

    }
}


const displayPageRecipe = (meal) => {
    FavoriteMealsLocal.forEach(meal => {
        displayFavoriteCardMeal(meal)

    })
}



const displayShoppingList = () => {

    displayShoppingListHeader()
}



displayPageRecipe()
displayShoppingList()


