import { recipes } from "./recipes.js";
import { createRecipeCards } from "./dom/factory.js";
import { updateAdvancedSearchOptions } from "./dom/updateAdvancedSearchOptions.js";
import { setEventHandlers } from "./search/eventListener/eventListener.js";

createRecipeCards(recipes);
updateAdvancedSearchOptions(recipes);
setEventHandlers();
