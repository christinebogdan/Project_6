import { ingredientSet } from "./coreSearchVar.js";
import { applianceSet } from "./coreSearchVar.js";
import { ustensilSet } from "./coreSearchVar.js";
import { searchPattern } from "./algorithms/kmp.js";
import { createAdvancedSearchOptions } from "../dom/createAdvancedSearchOptions.js";

let ingredientsArrayNoDuplicates = [];
let applianceArrayNoDuplicates = [];
let ustensilsArrayNoDuplicates = [];

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

export function updateAdvancedSearchOptions(searchResults) {
  // remove duplicate ingredients, appliances and ustensils from search results
  removeDuplicateValues(Array.from(searchResults));
  // fill advanced search fields with values matching the results of the search query

  createAdvancedSearchOptions(ingredientsArrayNoDuplicates, "ingredients");
  createAdvancedSearchOptions(applianceArrayNoDuplicates, "appliance");
  createAdvancedSearchOptions(ustensilsArrayNoDuplicates, "ustensils");
}

// ------------------------------------------------------------- //
// ----------------------- EVENT HANDLING ---------------------- //
// ------------------------------------------------------------- //

export function advancedInputSearch(e) {
  e.stopPropagation();
  let query = e.target.value.toLowerCase();
  let topic = e.target.id;
  let possibleResults;
  if (topic === "ingredientsSearchInput") {
    possibleResults = ingredientsArrayNoDuplicates;
  } else if (topic === "applianceSearchInput") {
    possibleResults = applianceArrayNoDuplicates;
  } else if (topic === "ustensilsSearchInput") {
    possibleResults = ustensilsArrayNoDuplicates;
  }

  if (query.length === 0) {
    possibleResults.forEach((element) => {
      document.querySelector(`[data-filter="${element}"]`).style.display =
        "block";
    });
  } else {
    for (let i = 0; i < possibleResults.length; i++) {
      const domElement = document.querySelector(
        `[data-filter="${possibleResults[i]}"]`
      );
      domElement.style.display = "none";
      if (searchPattern(query, possibleResults[i])) {
        domElement.style.display = "block";
      }
    }
  }
}

// ingredientsSearchInput.addEventListener("input", advancedInputSearch);
// applianceSearchInput.addEventListener("input", advancedInputSearch);
// ustensilsSearchInput.addEventListener("input", advancedInputSearch);
