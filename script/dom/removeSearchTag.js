import { mainSearch } from "../search/coreSearchVar.js";
import { searchResults } from "../search/coreSearchVar.js";
import { showAllRecipes } from "../search/showAllRecipes.js";
import { searchPossibleResults } from "../search/mainSearch.js";
import { getFilterTagsSearchResults } from "../search/filterByAllTags.js";

const searchTagContainer = document.querySelector("#search-tags");
let searchTags = document.querySelector("#search-tags").children;

// --------------------- deleting filter ---------------------- //
export function removeSearchTag(e) {
  e.stopPropagation();
  let tag = e.target.parentElement;
  let filterItem = tag.getAttribute("data-filter");
  tag.remove();

  if (searchTags.length === 0) {
    searchTagContainer.classList.remove("mt-3");
  }
  unfilterByTags(filterItem);
}

function unfilterByTags() {
  // search Results zurücksetzen, da Suche von vorne laufen muss
  searchResults.clear();

  // if main search > 2
  if (mainSearch.value.length > 2) {
    searchPossibleResults(mainSearch.value);
  }
  // if main search < 3 || filter tags left | no filter tags left
  else {
    if (searchTags.length === 0) {
      showAllRecipes();
    } else {
      getFilterTagsSearchResults();
    }
  }
}
