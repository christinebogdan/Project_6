const ingredientOptions = document.querySelector("#ingredientOptions");
const ingredientSearchInput = document.querySelector("#ingredientSearchInput");
const recipeContainer = document.querySelector(".recipes");
const ingredientSearchOptions = document.querySelector(
  "#ingredientOptions .row"
);

const deviceSearchOptions = document.querySelector("#deviceOptions .row");
const ustensilSearchOptions = document.querySelector("#ustensilOptions .row");

const ingredientSet = new Set();
let ingredientsArrayNoDuplicates = [];
const deviceSet = new Set();
let devicesArrayNoDuplicates = [];
const ustensilSet = new Set();
let ustensilsArrayNoDuplicates = [];

// ------------------------------------------------------------- //
// --------------------- FUNCTION CALLS ------------------------ //
// ------------------------------------------------------------- //

removeDuplicateValues();

createAdvancedSearchOptions(ingredientsArrayNoDuplicates, "ingredients");
createAdvancedSearchOptions(devicesArrayNoDuplicates, "devices");
createAdvancedSearchOptions(ustensilsArrayNoDuplicates, "ustensils");

createRecipeCards(recipes);

// ------------------------------------------------------------- //
// ----------------- ADVANCED SEARCH OPTIONS ------------------- //
// ------------------------------------------------------------- //

// --------------------- REMOVE DUPLICATES --------------------- //

// create arrays of ingredients, devices and ustensils with no duplicate values
function removeDuplicateValues() {
  recipes.forEach((recipe) => {
    // fill ingredient set
    recipe.ingredients.forEach((ingredient) => {
      ingredientSet.add(ingredient.ingredient.toLowerCase());
    });

    // fill device set
    deviceSet.add(recipe.appliance.toLowerCase());

    // fill ustensils set
    recipe.ustensils.forEach((ustensil) => {
      ustensilSet.add(ustensil.toLowerCase());
    });
  });

  // turn sets into arrays
  ingredientsArrayNoDuplicates = [...ingredientSet];
  devicesArrayNoDuplicates = [...deviceSet];
  ustensilsArrayNoDuplicates = [...ustensilSet];
}

// -------------------- CREATE DOM ELEMENTS -------------------- //

// create dom elements for advanced search based on array and topic
function createAdvancedSearchOptions(array, topic) {
  let domParent;
  if (topic === "ingredients") {
    domParent = ingredientSearchOptions;
  } else if (topic === "devices") {
    domParent = deviceSearchOptions;
  } else if (topic === "ustensils") {
    domParent = ustensilSearchOptions;
  }

  array.forEach((element) => {
    let domChild = document.createElement("p");
    domChild.classList.add("col-4", "mb-c7");
    domChild.textContent = element.charAt(0).toUpperCase() + element.slice(1);

    domParent.appendChild(domChild);
  });
}

// ------------------------------------------------------------- //
// ----------------------- RECIPE CARDS ------------------------ //
// ------------------------------------------------------------- //

// -------------------- CREATE DOM ELEMENTS -------------------- //

function createRecipeCards(data) {
  const factory = new Factory();

  data.forEach((recipe) => {
    let recipeCard = factory.createRecipeCard(recipe).create();
    recipeContainer.appendChild(recipeCard);
  });
}
