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
    tag.setAttribute("data-topic", topic);
  } else if (topic === "appliance") {
    tag.classList.add("bg-success");
    tag.setAttribute("data-topic", topic);
  } else if (topic === "ustensils") {
    tag.classList.add("bg-danger");
    tag.setAttribute("data-topic", topic);
  }
  // set tag content and x close button
  const tagContent = document.createElement("span");
  tagContent.classList.add("d-inline-block", "me-c2");
  tagContent.textContent = filterItem;
  const removeTagButton = document.createElement("i");
  removeTagButton.classList.add("bi", "bi-x-circle");

  // add event listener to close button
  removeTagButton.addEventListener("click", removeTag);

  // append all
  tag.appendChild(tagContent);
  tag.appendChild(removeTagButton);
  searchTagContainer.appendChild(tag);
}

// ---------------------- EVENT HANDLING ----------------------- //

function removeTag(e) {
  e.stopPropagation();
  let tag = e.target.parentElement;
  tag.remove();

  if (searchTags.length === 0) {
    searchTagContainer.classList.remove("mt-4");
  }
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

    domParent.appendChild(domChild);
  });
}

// ---------------------- EVENT HANDLING ---------------------- //

function chooseAdvancedSearchOption(e) {
  e.stopPropagation();
  let target = e.target;
  if (searchTags.length === 0) {
    searchTagContainer.classList.add("mt-4");
  }
  if (target.classList.contains("filter-option")) {
    let filterItem = target.textContent;
    let topic;
    if (target.parentElement === ingredientSearchOptions) {
      topic = "ingredients";
    } else if (target.parentElement === applianceSearchOptions) {
      topic = "appliance";
    } else if (target.parentElement === ustensilSearchOptions) {
      topic = "ustensils";
    }
    createTag(filterItem, topic);
    // filterByTags(filterItem, possibleResults, searchResults);
  }
}

document
  .getElementById("ingredientsCollapse")
  .addEventListener("click", chooseAdvancedSearchOption);
document
  .getElementById("applianceCollapse")
  .addEventListener("click", chooseAdvancedSearchOption);
document
  .getElementById("ustensilsCollapse")
  .addEventListener("click", chooseAdvancedSearchOption);

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
