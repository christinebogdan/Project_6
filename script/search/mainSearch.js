// why are imported variables read-only?
// why are imported arrays mutable?

import { noMatchesDisplay } from "./coreSearchVar.js";
import { searchResults } from "./coreSearchVar.js";
import { searchTags } from "./coreSearchVar.js";
import { recipes } from "../recipes.js";
import { getFilterTagsSearchResults } from "./filterByAllTags.js";
import searchPattern from "./algorithms/linearSearch.js";
import { updateAdvancedSearchOptions } from "../dom/updateAdvancedSearchOptions.js";
// import { mainSearch } from "../search/coreSearchVar.js";
// import { showAllRecipes } from "../search/showAllRecipes.js";
let previousQuery = "";

export function searchPossibleResults(query) {
  noMatchesDisplay.style.display = "none";
  let possibleResults;

  // muss search resettet werden, wenn keine search results?

  // SEARCH RESULT === 0 || filter tags inactive | filter tags active
  if (searchResults.size === 0) {
    if (searchTags.length === 0) {
      possibleResults = recipes;
    } else {
      getFilterTagsSearchResults();
      possibleResults = Array.from(searchResults);
    }
  }

  // SEARCH RESULT > 0 || continued typing | different query with / filter tags inactive / filter tags active
  else {
    if (searchPattern(previousQuery, query)) {
      possibleResults = Array.from(searchResults);
    } else {
      if (searchTags.length === 0) {
        possibleResults = recipes;
      } else {
        searchResults.clear();
        getFilterTagsSearchResults();
        possibleResults = Array.from(searchResults);
      }
    }
    searchResults.clear();
  }

  for (let i = 0; i < possibleResults.length; i++) {
    const recipe = possibleResults[i];
    const recipeID = recipe.id;
    const recipeDOMElement = document.getElementById(recipeID);
    recipeDOMElement.setAttribute("data-found", "false");
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients;
    const recipeDescription = recipe.description.toLowerCase();

    if (searchPattern(query, recipeTitle)) {
      searchResults.add(recipe);
      recipeDOMElement.setAttribute("data-found", "true");
    } else if (searchPattern(query, recipeDescription)) {
      searchResults.add(recipe);
      recipeDOMElement.setAttribute("data-found", "true");
    } else {
      recipeIngredients.forEach((element) => {
        if (searchPattern(query, element.ingredient.toLowerCase())) {
          searchResults.add(recipe);
          recipeDOMElement.setAttribute("data-found", "true");
        }
      });
    }
  }
  previousQuery = query;

  if (searchResults.size === 0) {
    noMatchesDisplay.style.display = "flex";
  }
  updateAdvancedSearchOptions(Array.from(searchResults));
}

// // ---------------------- EVENT HANDLING ----------------------- //

// mainSearch.addEventListener("input", (e) => {
//   let query = e.target.value.toLowerCase();
//   console.log(query);
//   if (query.length >= 3) {
//     searchPossibleResults(query);
//   } else {
//     noMatchesDisplay.style.display = "none";
//     if (searchTags.length === 0) {
//       showAllRecipes();
//     } else {
//       searchResults.clear();
//       getFilterTagsSearchResults();
//     }
//   }
// });
