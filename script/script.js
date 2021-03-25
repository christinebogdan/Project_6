const ingredientOptions = document.querySelector("#ingredientOptions");
const ingredientSearchInput = document.querySelector("#ingredientSearchInput");
const recipeContainer = document.querySelector(".recipes");

class recipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  #createIngredientList(data) {
    const ingredients = document.createElement("div");
    ingredients.classList.add("card-text", "col-6", "recipe-ingredients");
    let ingredient = ``;
    data.forEach((element) => {
      if (element.ingredient && element.quantity && element.unit) {
        if (element.unit.length < 3) {
          ingredient += `<p class="m-0"><span>${element.ingredient}:</span> ${element.quantity}${element.unit}</p>`;
        } else {
          ingredient += `<p class="m-0"><span>${element.ingredient}:</span> ${element.quantity} ${element.unit}</p>`;
        }
      } else if (element.ingredient && element.quantity) {
        ingredient += `<p class="m-0"><span>${element.ingredient}:</span> ${element.quantity}</p>`;
      } else {
        ingredient += `<p class="m-0"><span>${element.ingredient}</span></p>`;
      }
      ingredients.innerHTML = ingredient;
    });

    return ingredients;
  }

  create() {
    // create card container
    const card = document.createElement("div");
    card.classList.add("card", "p-0");
    card.setAttribute("data-id", this.recipe.id);
    // create card image container
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img-top");
    // create card body container
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-c3");

    // create body content
    const titleRow = document.createElement("div");
    titleRow.classList.add("row");
    const textRow = document.createElement("div");
    textRow.classList.add("row", "overflow-hidden");
    // recipe title
    const recipeTitle = document.createElement("h5");
    recipeTitle.textContent = this.recipe.name;
    recipeTitle.classList.add("card-title", "col-8", "recipe-title");
    // recipe time
    const recipeTime = document.createElement("div");
    recipeTime.classList.add("col-4", "text-end", "recipe-time");
    recipeTime.innerHTML = `<i class='bi bi-clock pe-2'></i>${this.recipe.time} min`;
    // recipe ingredients
    const recipeIngredients = this.#createIngredientList(
      this.recipe.ingredients
    );
    // const recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add("card-text", "col-6", "recipe-ingredients");

    // recipe instructions
    const recipeInstructions = document.createElement("div");
    recipeInstructions.classList.add(
      "card-text",
      "col-6",
      "recipe-instructions",
      "text-truncate"
    );
    recipeInstructions.textContent = this.recipe.description;

    // append all
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    titleRow.appendChild(recipeTitle);
    titleRow.appendChild(recipeTime);
    textRow.appendChild(recipeIngredients);
    textRow.appendChild(recipeInstructions);
    cardBody.appendChild(titleRow);
    cardBody.appendChild(textRow);

    return card;
  }
}

function Factory() {
  this.createRecipeCard = function (element) {
    return new recipeCard(element);
  };
}

function createRecipeCards(data) {
  const factory = new Factory();

  data.forEach((recipe) => {
    let recipeCard = factory.createRecipeCard(recipe).create();
    recipeContainer.appendChild(recipeCard);
  });
}

createRecipeCards(recipes);
// // create recipe overview
// function createRecipeCards(data) {
//   const factory = new Factory();

//   data.forEach((recipe) => {
//     let recipeCard = factory.createRecipeCard(recipe).create();
//     recipeContainer.appendChild(recipeCard);
//   });
// }

// createRecipeCards(recipes);
// const recipes = [
//   {
//     id: 1,
//     name: "Coconut Lemonade",
//     servings: 1,
//     ingredients: [
//       {
//         ingredient: "Coconut milk",
//         quantity: 400,
//         unit: "ml",
//       },
//       {
//         ingredient: "Lemon juice",
//         quantity: 2,
//       },
//       {
//         ingredient: "Coconut cream",
//         quantity: 2,
//         unit: "tablespoons",
//       },
//       {
//         ingredient: "Sugar",
//         quantite: 30,
//         unit: "grams",
//       },
//       {
//         ingredient: "Ice cubes",
//       },
//     ],
//     time: 10,
//     description:
//       "Place the ice cubes to your taste in the blender, add the milk, the coconut cream, the juice from 2 lemons and the sugar. Blend to the desired consistency",
//     appliance: "Blender",
//     ustensils: ["tablespoons", "glasses", "lemon squeezer"],
//   },
// ];
