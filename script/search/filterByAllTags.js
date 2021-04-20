import { searchTags } from "./coreSearchVar.js";
import { filterByTag } from "./filterByTag.js";

// run filter tag(s) on recipe basis
export function getFilterTagsSearchResults() {
  Array.from(searchTags).forEach((tag) => {
    const filterItem = tag.getAttribute("data-filter").toLowerCase();
    const topic = tag.getAttribute("data-topic");
    filterByTag(filterItem, topic);
  });
}
