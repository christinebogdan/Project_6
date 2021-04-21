import { recipes } from "../recipes.js";
import { searchResults } from "./coreSearchVar.js";
import { updateAdvancedSearchOptions } from "../dom/updateAdvancedSearchOptions.js";
import { searchPattern } from "./algorithms/kmp.js";

export function filterByTag(filterItem, topic) {
  let possibleResults;
  if (searchResults.size === 0) {
    possibleResults = recipes;
  } else {
    possibleResults = Array.from(searchResults);
    searchResults.clear();
  }

  for (let i = 0; i < possibleResults.length; i++) {
    const recipe = possibleResults[i];
    const recipeID = recipe.id;
    const recipeDOMElement = document.getElementById(recipeID);
    recipeDOMElement.setAttribute("data-found", "false");
    const recipeUstensils = recipe.ustensils;
    const recipeIngredients = recipe.ingredients;
    const recipeAppliance = recipe.appliance;

    if (topic === "ingredients") {
      recipeIngredients.forEach((element) => {
        if (searchPattern(filterItem, element.ingredient.toLowerCase())) {
          searchResults.add(recipe);
          recipeDOMElement.setAttribute("data-found", "true");
        }
      });
    } else if (topic === "appliance") {
      if (searchPattern(filterItem, recipeAppliance.toLowerCase())) {
        searchResults.add(recipe);
        recipeDOMElement.setAttribute("data-found", "true");
      }
    } else if (topic === "ustensils") {
      recipeUstensils.forEach((element) => {
        if (searchPattern(filterItem, element.toLowerCase())) {
          searchResults.add(recipe);
          recipeDOMElement.setAttribute("data-found", "true");
        }
      });
    }
  }

  updateAdvancedSearchOptions(Array.from(searchResults));
  const tag = document.querySelector(
    `.filter-option[data-filter="${filterItem}"]`
  );

  tag.setAttribute("data-hide", "true");
  console.log(tag);
}
