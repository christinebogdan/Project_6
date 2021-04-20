import { recipeCard } from "./factory_recipe-card.js";

// ------------------------------------------------------------- //
// ----------------------- RECIPE CARDS ------------------------ //
// ------------------------------------------------------------- //

// -------------------- CREATE DOM ELEMENTS -------------------- //

function Factory() {
  this.createRecipeCard = function (element) {
    return new recipeCard(element);
  };
}

// -------------------- CREATE DOM ELEMENTS -------------------- //

export function createRecipeCards(data) {
  const recipeContainer = document.querySelector(".recipes");
  const factory = new Factory();

  data.forEach((recipe) => {
    let recipeCard = factory.createRecipeCard(recipe).create();
    recipeContainer.appendChild(recipeCard);
  });
}
