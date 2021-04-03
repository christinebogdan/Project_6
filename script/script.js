const searchTagContainer = document.querySelector("#search-tags");

// HTML Live Collection of search tags
let searchTags = searchTagContainer.children;

const ingredientSearchOptions = document.querySelector(
  "#ingredientOptions .row"
);
const applianceSearchOptions = document.querySelector("#applianceOptions .row");
const ustensilSearchOptions = document.querySelector("#ustensilOptions .row");

const ingredientSet = new Set();
let ingredientsArrayNoDuplicates = [];
const applianceSet = new Set();
let applianceArrayNoDuplicates = [];
const ustensilSet = new Set();
let ustensilsArrayNoDuplicates = [];

const recipeContainer = document.querySelector(".recipes");

// ------------------------------------------------------------- //
// --------------------- FUNCTION CALLS ------------------------ //
// ------------------------------------------------------------- //

removeDuplicateValues(recipes);

createAdvancedSearchOptions(ingredientsArrayNoDuplicates, "ingredients");
createAdvancedSearchOptions(applianceArrayNoDuplicates, "appliance");
createAdvancedSearchOptions(ustensilsArrayNoDuplicates, "ustensils");

createRecipeCards(recipes);

// ------------------------------------------------------------- //
// ----------------------- SEARCH TAGS ------------------------- //
// ------------------------------------------------------------- //

// ------------------------ CREATE TAGS ------------------------ //

function createTag(filterItem, topic) {
  // create tag container
  const tag = document.createElement("div");
  tag.classList.add(
    "search-tag",
    "rounded",
    "d-flex",
    "align-items-center",
    "justify-content-between",
    "text-white",
    "px-c3",
    "me-2"
  );
  // set color depending on filter topic
  if (topic === "ingredients") {
    tag.classList.add("bg-primary");
  } else if (topic === "appliance") {
    tag.classList.add("bg-success");
  } else if (topic === "ustensils") {
    tag.classList.add("bg-danger");
  }
  // set tag content and x close button
  const tagContent = document.createElement("span");
  tagContent.classList.add("d-inline-block", "me-c2");
  tagContent.textContent = filterItem;
  const removeTagButton = document.createElement("i");
  removeTagButton.classList.add("bi", "bi-x-circle");

  // add event listener to close button
  removeTagButton.addEventListener("click", removeTag);

  tag.setAttribute("data-topic", topic);
  tag.setAttribute("data-filter", filterItem);

  // append all
  tag.appendChild(tagContent);
  tag.appendChild(removeTagButton);
  searchTagContainer.appendChild(tag);
}

// --------------- DISPLAY SEARCH TAG CONTAINER ---------------- //

// HTML Collection (live list) monitoring amount of tags displayed
// and showing or hiding searchTagContainer depending on list length

// ------------------------------------------------------------- //
// ----------------- ADVANCED SEARCH OPTIONS ------------------- //
// ------------------------------------------------------------- //

// --------------------- REMOVE DUPLICATES --------------------- //

// create arrays of ingredients, appliances and ustensils with no duplicate values
function removeDuplicateValues(searchResults) {
  ingredientSet.clear();
  applianceSet.clear();
  ustensilSet.clear();

  searchResults.forEach((recipe) => {
    // fill ingredient set
    recipe.ingredients.forEach((ingredient) => {
      ingredientSet.add(ingredient.ingredient.toLowerCase());
    });

    // fill appliance set
    applianceSet.add(recipe.appliance.toLowerCase());

    // fill ustensils set
    recipe.ustensils.forEach((ustensil) => {
      ustensilSet.add(ustensil.toLowerCase());
    });
  });

  // turn sets into arrays
  ingredientsArrayNoDuplicates = [...ingredientSet];
  applianceArrayNoDuplicates = [...applianceSet];
  ustensilsArrayNoDuplicates = [...ustensilSet];
}

// -------------------- CREATE DOM ELEMENTS -------------------- //

// create dom elements for advanced search based on array and topic
function createAdvancedSearchOptions(array, topic) {
  let domParent;
  if (topic === "ingredients") {
    domParent = ingredientSearchOptions;
  } else if (topic === "appliance") {
    domParent = applianceSearchOptions;
  } else if (topic === "ustensils") {
    domParent = ustensilSearchOptions;
  }

  domParent.innerHTML = "";

  array.forEach((element) => {
    let domChild = document.createElement("p");
    domChild.classList.add("col-4", "mb-c7", "filter-option");
    domChild.textContent = element.charAt(0).toUpperCase() + element.slice(1);
    domChild.setAttribute("data-filter", domChild.textContent);
    domChild.setAttribute("data-topic", topic);

    domParent.appendChild(domChild);
  });
}

// ---------------------- EVENT HANDLING ---------------------- //

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
