import { searchTags } from "../search/coreSearchVar.js";
import { createSearchTag } from "./createSearchTag.js";
import { filterByTag } from "../search/filterByTag.js";

export function chooseAdvancedSearchOption(e) {
  e.stopPropagation();
  let target = e.target;
  const searchTagContainer = document.querySelector("#search-tags");

  if (target.classList.contains("filter-option")) {
    if (searchTags.length === 0) {
      searchTagContainer.classList.add("mt-3");
    }
    // let filterItem = target.getAttribute("data-filter");
    let filterItem = target.textContent;
    console.log(filterItem);
    let topic = target.getAttribute("data-topic");
    createSearchTag(filterItem, topic);
    filterByTag(filterItem.toLowerCase(), topic);
  }
}

// document
//   .getElementById("ingredientsCollapse")
//   .addEventListener("click", chooseAdvancedSearchOption);
// document
//   .getElementById("applianceCollapse")
//   .addEventListener("click", chooseAdvancedSearchOption);
// document
//   .getElementById("ustensilsCollapse")
//   .addEventListener("click", chooseAdvancedSearchOption);
