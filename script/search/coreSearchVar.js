import { recipes } from "../recipes.js";

export const mainSearch = document.getElementById("searchField");
export let searchResults = new Set();
export let possibleResults = recipes;
export const ingredientSet = new Set();
// export let ingredientsArrayNoDuplicates = []; // why is this read-only when imported?
export const applianceSet = new Set();
// export let applianceArrayNoDuplicates = [];
export const ustensilSet = new Set();
// export let ustensilsArrayNoDuplicates = [];
export let searchTags = document.querySelector("#search-tags").children;
export const noMatchesDisplay = document.querySelector("#nomatch");
