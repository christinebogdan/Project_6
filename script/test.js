// CREATE RECIPE CARD DOM ELEMENTS

import { recipes } from "./recipes.js";
import { createRecipeCards } from "./dom/factory.js";
import { updateAdvancedSearchOptions } from "./search/updateAdvancedSearchOptions.js";
import { setEventHandlers } from "./search/eventListener/eventListener.js";

createRecipeCards(recipes);
updateAdvancedSearchOptions(recipes);
setEventHandlers();

// ------------------------------------------------------------- //
// ------------------------ VARIABLES -------------------------- //
// ------------------------------------------------------------- //

// ------------------------ MAIN SEARCH ------------------------ //

// const mainSearch = document.getElementById("searchField");
// let searchResults = new Set();
// let possibleResults = recipes;
// let previousQuery = "";

// ------------------------ SEARCH TAGS ------------------------ //

// const searchTagContainer = document.querySelector("#search-tags");
// HTML Live Collection of search tags
// let searchTags = document.querySelector("#search-tags").children;

// ----------------- ADVANCED SEARCH OPTIONS ------------------- //

// const ingredientsSearchInput = document.querySelector(
//   "#ingredientsSearchInput"
// );
// const applianceSearchInput = document.querySelector("#applianceSearchInput");
// const ustensilsSearchInput = document.querySelector("#ustensilsSearchInput");

// const ingredientsSearchOptions = document.querySelector(
//   "#ingredientOptions .row"
// );
// const applianceSearchOptions = document.querySelector("#applianceOptions .row");
// const ustensilsSearchOptions = document.querySelector("#ustensilOptions .row");

// const ingredientSet = new Set();
// let ingredientsArrayNoDuplicates = [];
// const applianceSet = new Set();
// let applianceArrayNoDuplicates = [];
// const ustensilSet = new Set();
// let ustensilsArrayNoDuplicates = [];

// ----------------------- RECIPE CARDS ------------------------ //

// const noMatchesDisplay = document.querySelector("#nomatch");

// ------------------------------------------------------------- //
// --------------------- FUNCTION CALLS ------------------------ //
// ------------------------------------------------------------- //

// ------------------------- CREATE LP ------------------------- //

// updateAdvancedSearchOptions(recipes);
// createRecipeCards(recipes);

// removeDuplicateValues(recipes);

// createAdvancedSearchOptions(ingredientsArrayNoDuplicates, "ingredients");
// createAdvancedSearchOptions(applianceArrayNoDuplicates, "appliance");
// createAdvancedSearchOptions(ustensilsArrayNoDuplicates, "ustensils");

// ------------------------------------------------------------- //
// ----------------------- SEARCH TAGS ------------------------- //
// ------------------------------------------------------------- //

// ------------------------ CREATE TAGS ------------------------ //

// function createTag(filterItem, topic) {
//   // create tag container
//   const tag = document.createElement("div");
//   tag.classList.add(
//     "search-tag",
//     "rounded",
//     "d-flex",
//     "align-items-center",
//     "justify-content-between",
//     "text-white",
//     "px-c3",
//     "me-2"
//   );
//   // set color depending on filter topic
//   if (topic === "ingredients") {
//     tag.classList.add("bg-primary");
//   } else if (topic === "appliance") {
//     tag.classList.add("bg-success");
//   } else if (topic === "ustensils") {
//     tag.classList.add("bg-danger");
//   }
//   // set tag content and x close button
//   const tagContent = document.createElement("span");
//   tagContent.classList.add("d-inline-block", "me-c2");
//   tagContent.textContent = filterItem;
//   const removeTagButton = document.createElement("i");
//   removeTagButton.classList.add("bi", "bi-x-circle");

//   // add event listener to close button
//   removeTagButton.addEventListener("click", removeTag);

//   tag.setAttribute("data-topic", topic);
//   tag.setAttribute("data-filter", filterItem.toLowerCase());

//   // append all
//   tag.appendChild(tagContent);
//   tag.appendChild(removeTagButton);
//   searchTagContainer.appendChild(tag);
// }

// --------------- DISPLAY SEARCH TAG CONTAINER ---------------- //

// HTML Collection (live list) monitoring amount of tags displayed
// and showing or hiding searchTagContainer depending on list length
// added to event listener on close tag button

// ------------------------------------------------------------- //
// ----------------- ADVANCED SEARCH OPTIONS ------------------- //
// ------------------------------------------------------------- //

// --------------------- REMOVE DUPLICATES --------------------- //

// // create arrays of ingredients, appliances and ustensils with no duplicate values
// function removeDuplicateValues(searchResults) {
//   ingredientSet.clear();
//   applianceSet.clear();
//   ustensilSet.clear();

//   searchResults.forEach((recipe) => {
//     // fill ingredient set
//     recipe.ingredients.forEach((ingredient) => {
//       ingredientSet.add(ingredient.ingredient.toLowerCase());
//     });

//     // fill appliance set
//     applianceSet.add(recipe.appliance.toLowerCase());

//     // fill ustensils set
//     recipe.ustensils.forEach((ustensil) => {
//       ustensilSet.add(ustensil.toLowerCase());
//     });
//   });

//   // turn sets into arrays
//   ingredientsArrayNoDuplicates = [...ingredientSet];
//   applianceArrayNoDuplicates = [...applianceSet];
//   ustensilsArrayNoDuplicates = [...ustensilSet];
// }

// -------------------- CREATE DOM ELEMENTS -------------------- //

// // create dom elements for advanced search based on noDouplicateArrays and search topic
// function createAdvancedSearchOptions(array, topic) {
//   // let domParent = topic;
//   let domParent;
//   if (topic === "ingredients") {
//     domParent = ingredientsSearchOptions;
//   } else if (topic === "appliance") {
//     domParent = applianceSearchOptions;
//   } else if (topic === "ustensils") {
//     domParent = ustensilsSearchOptions;
//   }

//   domParent.innerHTML = "";

//   array.forEach((element) => {
//     let domChild = document.createElement("p");
//     domChild.classList.add(
//       "col-xs-12",
//       "col-lg-4",
//       "col-md-6",
//       "mb-c7",
//       "filter-option"
//     );
//     domChild.textContent = element.charAt(0).toUpperCase() + element.slice(1);
//     domChild.setAttribute("data-filter", domChild.textContent.toLowerCase());
//     domChild.setAttribute("data-topic", topic);
//     domChild.setAttribute("data-hide", "false");

//     domParent.appendChild(domChild);
//   });
// }

// --------------- UPDATE ADVANCED SEARCH OPTIONS -------------- //

// function updateAdvancedSearchOptions(searchResults) {
//   // remove duplicate ingredients, appliances and ustensils from search results
//   removeDuplicateValues(Array.from(searchResults));
//   // fill advanced search fields with values matching the results of the search query

//   createAdvancedSearchOptions(ingredientsArrayNoDuplicates, "ingredients");
//   createAdvancedSearchOptions(applianceArrayNoDuplicates, "appliance");
//   createAdvancedSearchOptions(ustensilsArrayNoDuplicates, "ustensils");
// }

// ------------------------------------------------------------- //
// ----------------------- RECIPE CARDS ------------------------ //
// ------------------------------------------------------------- //

// -------------------- CREATE DOM ELEMENTS -------------------- //

// function createRecipeCards(data) {
//   const factory = new Factory();

//   data.forEach((recipe) => {
//     let recipeCard = factory.createRecipeCard(recipe).create();
//     recipeContainer.appendChild(recipeCard);
//   });
// }

// ------------------------------------------------------------- //
// ----------------------- BUTTONS ------------------------ //
// ------------------------------------------------------------- //

// const ingredientsButton = document.querySelector("#ingredientsButton");
// const ingredientsCollapse = document.querySelector("#ingredientsCollapse");

// ingredientsCollapse.addEventListener("show.bs.collapse", changeLayout);
// ingredientsCollapse.addEventListener("hide.bs.collapse", changeLayout);

// function changeLayout() {
//   ingredientsButton.classList.remove("col-sm-4", "col-md-3", "col-xl-2");

//   ingredientsButton.classList.add("col-sm-10", "col-md-8", "col-xl-6");
// }

// function changeLayoutBack() {
//   ingredientsButton.classList.add("col-sm-4", "col-md-3", "col-xl-2");
//   ingredientsButton.classList.remove("col-sm-10", "col-md-8, col-xl-6");
// }
