import { mainSearch } from "../coreSearchVar.js";
import { showAllRecipes } from "../showAllRecipes.js";
import { searchPossibleResults } from "../mainSearch.js";
import { noMatchesDisplay } from "../coreSearchVar.js";
import { searchResults } from "../coreSearchVar.js";
import { searchTags } from "../coreSearchVar.js";
import { getFilterTagsSearchResults } from "../filterByAllTags.js";
import { chooseAdvancedSearchOption } from "../../dom/chooseAdvancedSearchOption.js";
import { advancedInputSearch } from "../../dom/updateAdvancedSearchOptions.js";

const ingredientsSearchInput = document.querySelector(
  "#ingredientsSearchInput"
);
const applianceSearchInput = document.querySelector("#applianceSearchInput");
const ustensilsSearchInput = document.querySelector("#ustensilsSearchInput");

// ---------------------- EVENT HANDLING ----------------------- //

export function setEventHandlers() {
  // main search
  mainSearch.addEventListener("input", (e) => {
    let query = e.target.value.toLowerCase();
    console.log(query);
    if (query.length >= 3) {
      searchPossibleResults(query);
    } else {
      noMatchesDisplay.style.display = "none";
      if (searchTags.length === 0) {
        showAllRecipes();
      } else {
        searchResults.clear();
        getFilterTagsSearchResults();
      }
    }
  });

  // click on filter item
  document
    .getElementById("ingredientsCollapse")
    .addEventListener("click", chooseAdvancedSearchOption);
  document
    .getElementById("applianceCollapse")
    .addEventListener("click", chooseAdvancedSearchOption);
  document
    .getElementById("ustensilsCollapse")
    .addEventListener("click", chooseAdvancedSearchOption);

  // filter category input
  ingredientsSearchInput.addEventListener("input", advancedInputSearch);
  applianceSearchInput.addEventListener("input", advancedInputSearch);
  ustensilsSearchInput.addEventListener("input", advancedInputSearch);
}
