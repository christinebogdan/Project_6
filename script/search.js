// ------------------------------------------------------------- //
// ----------------------- MAIN SEARCH ------------------------- //
// ------------------------------------------------------------- //

// ---------------------- EVENT HANDLING ----------------------- //

mainSearch.addEventListener("input", (e) => {
  let query = e.target.value.toLowerCase();
  if (query.length >= 3) {
    searchPossibleResults(query);
  }
  if (query.length < 3) {
    showAllRecipes();
  }
});

// --------------------- SHOW ALL RECIPES --------------------- //

function showAllRecipes() {
  const showAllRecipes = document.querySelectorAll(["[data-found='false']"]);
  showAllRecipes.forEach((recipe) => {
    recipe.setAttribute("data-found", "true");
  });
  // hier noch searchResults.clear() ?
}

// --------------------- SEARCH FUNCTION ---------------------- //

function searchPossibleResults(query) {
  console.log("search results before search runs:", searchResults);
  if (searchResults.size > 0) {
    if (
      query.length > previousQuery.length &&
      searchPattern(previousQuery, query)
    ) {
      possibleResults = Array.from(searchResults);
    } else {
      possibleResults = recipes;
    }
    searchResults.clear();
  } else {
    possibleResults = recipes;
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
    }

    if (searchPattern(query, recipeDescription)) {
      searchResults.add(recipe);
      recipeDOMElement.setAttribute("data-found", "true");
    }

    recipeIngredients.forEach((element) => {
      if (searchPattern(query, element.ingredient.toLowerCase())) {
        searchResults.add(recipe);
        recipeDOMElement.setAttribute("data-found", "true");
      }
    });
  }
  console.log("searchresults are:", searchResults);
  previousQuery = query;

  updateAdvancedSearchOptions(Array.from(searchResults));
}

// ------------------------------------------------------------- //
// --------------------- ADVANCED SEARCH ----------------------- //
// ------------------------------------------------------------- //

// ---------------------- EVENT HANDLING ----------------------- //

// ---------------------- choosing filter ---------------------- //

function chooseAdvancedSearchOption(e) {
  e.stopPropagation();
  let target = e.target;
  if (searchTags.length === 0) {
    searchTagContainer.classList.add("mt-4");
  }
  if (target.classList.contains("filter-option")) {
    let filterItem = target.getAttribute("data-filter");
    let topic = target.getAttribute("data-topic");
    createTag(filterItem, topic);
    filterByTags(filterItem.toLowerCase(), topic);
  }
}

document
  .getElementById("ingredientsCollapse")
  .addEventListener("click", chooseAdvancedSearchOption);
document
  .getElementById("applianceCollapse")
  .addEventListener("click", chooseAdvancedSearchOption);
document
  .getElementById("ustensilsCollapse")
  .addEventListener("click", chooseAdvancedSearchOption);

// --------------------- deleting filter ---------------------- //

function removeTag(e) {
  e.stopPropagation();
  let tag = e.target.parentElement;
  let topic = tag.getAttribute("data-topic");
  let filterItem = tag.getAttribute("data-filter");
  tag.remove();

  if (searchTags.length === 0) {
    searchTagContainer.classList.remove("mt-4");
  }
  unfilterByTags();
}

// --------------------- FILTER FUNCTION ----------------------- //

function filterByTags(filterItem, topic) {
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
    }

    if (topic === "appliance") {
      if (searchPattern(filterItem, recipeAppliance.toLowerCase())) {
        searchResults.add(recipe);
        recipeDOMElement.setAttribute("data-found", "true");
      }
    }

    if (topic === "ustensils") {
      recipeUstensils.forEach((element) => {
        if (searchPattern(filterItem, element.toLowerCase())) {
          searchResults.add(recipe);
          recipeDOMElement.setAttribute("data-found", "true");
        }
      });
    }
  }
  updateAdvancedSearchOptions(Array.from(searchResults));
  console.log(searchResults);
}

function unfilterByTags() {
  searchResults.clear();
  if (searchTags.length === 0) {
    if (mainSearch.value < 3) {
      showAllRecipes();
    } else {
      searchPossibleResults(mainSearch.value);
    }
  } else {
    if (mainSearch.length > 3) {
      searchPossibleResults(mainSearch.value);
    }
    console.log(Array.from(searchTags));
    Array.from(searchTags).forEach((tag) => {
      console.log(searchResults);
      const filterItem = tag.getAttribute("data-filter");
      const topic = tag.getAttribute("data-topic");
      filterByTags(filterItem, topic);
      console.log(searchResults);
    });
  }
}

// ------------------------------------------------------------- //
// ------------------------ ALGORITHM -------------------------- //
// ------------------------------------------------------------- //

// ----------------------- KMP ALGORITHM ----------------------- //

// pattern search function

function searchPattern(query, text) {
  const m = query.length;
  const n = text.length;

  // preprocess query to get lps with longest prefix suffix for the pattern
  const lps = computeLSPArray(query);

  // set indices for text and query
  // index for text
  let i = 0;
  // index for query
  let j = 0;

  while (i < n) {
    if (query[j] === text[i]) {
      i++;
      j++;
      if (j === m) {
        return true;
      }
    } else if (query[j] !== text[i]) {
      if (j === 0) {
        i++;
      } else {
        j = lps[j - 1];
      }
    }
  }
  return false;
}

// ------------------- KMP HELPER FUNCTION -------------------- //

// helper function to compute the lsp array for the kmp algorithm

function computeLSPArray(query) {
  // length of the previous longest prefix = suffix
  const lps = [];
  let len = 0;

  // lps[0] is always 0 - no suffix available
  lps[0] = len;

  // calculate all values for lps
  // get length of pattern to know how often we have to loop through
  const m = query.length;

  // we start at index 1 with i = 0, since lps[0] is already set with value 0
  let i = 1;

  while (i < m) {
    if (query[len] === query[i]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len != 0) {
        len = len - 1;
        // or len = lps[len-1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

// if (recipeTitle.includes(query)) {
//   // show recipe
// } else if (recipeIngredients.includes(query)) {
//   // show recipe
// } else if (recipeDescription.includes(query)) {
//   // show recipe
// }

// function runMainSearchQuery(query, recipes) {
//   let possibleResults;
//   let searchResults = new Set();

//   if (searchPattern(previousQuery, query)) {
//     console.log(previousQuery, query);
//     possibleResults = Array.from(searchResults);
//     runMainSearchQuery(query, possibleResults);
//   } else {
//     possibleResults = recipes;
//   }

//   for (let i = 0; i < possibleResults.length; i++) {
//     const recipe = possibleResults[i];
//     const recipeID = recipe.id;
//     const recipeDOMElement = document.getElementById(recipeID);
//     recipeDOMElement.setAttribute("data-found", "false");
//     const recipeTitle = recipe.name.toLowerCase();
//     const recipeIngredients = recipe.ingredients;
//     const recipeDescription = recipe.description.toLowerCase();

//     if (searchPattern(query, recipeTitle)) {
//       console.log("found in title of recipe:", recipeID);
//       searchResults.add(recipe);
//       recipeDOMElement.setAttribute("data-found", "true");
//     }

//     if (searchPattern(query, recipeDescription)) {
//       console.log("found in description of recipe:", recipeID);
//       searchResults.add(recipe);
//       recipeDOMElement.setAttribute("data-found", "true");
//     }

//     recipeIngredients.forEach((element) => {
//       if (searchPattern(query, element.ingredient.toLowerCase())) {
//         console.log("found in ingredients of recipe:", recipeID);
//         searchResults.add(recipe);
//         recipeDOMElement.setAttribute("data-found", "true");
//       }
//     });
//   }
//   // previousQuery = query;
//   // console.log(previousQuery);
//   console.log(searchResults);
//   console.log("previous Query:", previousQuery);
// }

// else if (
//   query.length < previousQuery.length &&
//   searchPattern(query, previousQuery)
// ) {
//   possibleResults = possibleResults;
//   console.log(
//     "possible results when going back one step - to previous search results: ",
//     possibleResults
//   );
// }

// function runMainSearchQuery() {
//   let searchResults = new Set();
//   let possibleResults;
//   let previousQuery = "";

//   // use closure to keep track of search results and previous search query
//   function searchPossibleResults(query) {
//     console.log("search results before search runs:", searchResults);
//     if (searchResults.size > 0) {
//       if (
//         query.length > previousQuery.length &&
//         searchPattern(previousQuery, query)
//       ) {
//         possibleResults = Array.from(searchResults);
//       } else {
//         possibleResults = recipes;
//       }
//       searchResults.clear();
//     } else {
//       possibleResults = recipes;
//     }

//     for (let i = 0; i < possibleResults.length; i++) {
//       const recipe = possibleResults[i];
//       const recipeID = recipe.id;
//       const recipeDOMElement = document.getElementById(recipeID);
//       recipeDOMElement.setAttribute("data-found", "false");
//       const recipeTitle = recipe.name.toLowerCase();
//       const recipeIngredients = recipe.ingredients;
//       const recipeDescription = recipe.description.toLowerCase();

//       if (searchPattern(query, recipeTitle)) {
//         searchResults.add(recipe);
//         recipeDOMElement.setAttribute("data-found", "true");
//       }

//       if (searchPattern(query, recipeDescription)) {
//         searchResults.add(recipe);
//         recipeDOMElement.setAttribute("data-found", "true");
//       }

//       recipeIngredients.forEach((element) => {
//         if (searchPattern(query, element.ingredient.toLowerCase())) {
//           searchResults.add(recipe);
//           recipeDOMElement.setAttribute("data-found", "true");
//         }
//       });
//     }
//     console.log("searchresults are:", searchResults);
//     previousQuery = query;

//     // update advanced search fields
//     // remove duplicate ingredients, appliances and ustensils from search results
//     removeDuplicateValues(Array.from(searchResults));
//     // fill advanced search fields with values matching the results of the search query
//     createAdvancedSearchOptions(ingredientsArrayNoDuplicates, "ingredients");
//     createAdvancedSearchOptions(applianceArrayNoDuplicates, "appliance");
//     createAdvancedSearchOptions(ustensilsArrayNoDuplicates, "ustensils");
//   }

//   return searchPossibleResults;
// }
