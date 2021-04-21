import { updateAdvancedSearchOptions } from "../dom/updateAdvancedSearchOptions.js";
import { recipes } from "../recipes.js";
import { searchResults } from "./coreSearchVar.js";

// is it okay to import the same module several times into different modules?

export function showAllRecipes() {
  const showAllRecipes = document.querySelectorAll(["[data-found='false']"]);
  showAllRecipes.forEach((recipe) => {
    recipe.setAttribute("data-found", "true");
  });
  updateAdvancedSearchOptions(recipes);
  searchResults.clear();
}
