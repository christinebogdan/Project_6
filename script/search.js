// ------------------------------------------------------------- //
// ----------------------- MAIN SEARCH ------------------------- //
// ------------------------------------------------------------- //

// ---------------------- EVENT HANDLING ----------------------- //

mainSearch.addEventListener("input", (e) => {
  let query = e.target.value.toLowerCase();
  if (query.length >= 3) {
    searchPossibleResults(query);
  } else {
    noMatchesDisplay.style.display = "none";
    if (searchTags.length === 0) {
      showAllRecipes();
    } else {
      searchResults.clear();
      Array.from(searchTags).forEach((tag) => {
        console.log(searchResults);
        const filterItem = tag.getAttribute("data-filter").toLowerCase();
        const topic = tag.getAttribute("data-topic");
        filterByTags(filterItem, topic);
      });
    }
  }
});

// --------------------- SHOW ALL RECIPES --------------------- //

function showAllRecipes() {
  const showAllRecipes = document.querySelectorAll(["[data-found='false']"]);
  showAllRecipes.forEach((recipe) => {
    recipe.setAttribute("data-found", "true");
  });
  updateAdvancedSearchOptions(recipes);
  // muss das wieder weg?
  searchResults.clear();
}

// --------------------- SEARCH FUNCTION ---------------------- //

function searchPossibleResults(query) {
  console.log("search results before main search runs:", searchResults);
  noMatchesDisplay.style.display = "none";

  // muss search resettet werden, wenn keine search results?

  // SEARCH RESULT === 0
  if (searchResults.size === 0) {
    // keine Filter Tags aktiv
    if (searchTags.length === 0) {
      possibleResults = recipes;
      console.log("1.1");
    }
    // Filter Tags aktiv
    else {
      getFilterTagsSearchResults();
      possibleResults = Array.from(searchResults);
      console.log("1.2");
    }
  }

  // SEARCH RESULT > 0
  else if (searchResults.size > 0) {
    // wenn query weiterführung von previous query
    if (searchPattern(previousQuery, query)) {
      possibleResults = Array.from(searchResults);
      console.log("2.1");
    }
    // wenn query keine weiterführung von previous query (weil query angepasst oder query kleiner als previous query)
    else {
      // keine Filter Tags aktiv
      if (searchTags.length === 0) {
        possibleResults = recipes;
        console.log("2.2.1");
      }
      // Filter Tags aktiv
      else {
        searchResults.clear();
        getFilterTagsSearchResults();
        possibleResults = Array.from(searchResults);
        console.log("2.2.2");
      }
    }
    searchResults.clear();
  }

  // if (searchResults.size > 0) {
  //   // have query.length > 2
  //   if (searchTags.length > 0 && query.length === 3) {
  //     possibleResults = Array.from(searchResults);
  //   } else if (searchTags.length > 0 && query.length < previousQuery.length) {
  //     searchResults.clear();
  //     Array.from(searchTags).forEach((tag) => {
  //       console.log(searchResults);
  //       const filterItem = tag.getAttribute("data-filter").toLowerCase();
  //       const topic = tag.getAttribute("data-topic");
  //       filterByTags(filterItem, topic);
  //     });
  //     possibleResults = Array.from(searchResults);
  //   } else if (
  //     query.length > previousQuery.length &&
  //     searchPattern(previousQuery, query)
  //   ) {
  //     possibleResults = Array.from(searchResults);
  //   } else {
  //     possibleResults = recipes;
  //   }
  //   searchResults.clear();
  // } else {
  //   if (searchTags.length > 0) {
  //     Array.from(searchTags).forEach((tag) => {
  //       console.log(searchResults);
  //       const filterItem = tag.getAttribute("data-filter").toLowerCase();
  //       const topic = tag.getAttribute("data-topic");
  //       filterByTags(filterItem, topic);
  //     });
  //     possibleResults = Array.from(searchResults);
  //   } else {
  //     possibleResults = recipes;
  //   }
  // }
  console.log(query);
  console.log("possible results for main search:", possibleResults);

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
  console.log("main search results are:", searchResults);
  previousQuery = query;

  if (searchResults.size === 0) {
    noMatchesDisplay.style.display = "flex";
  }
  updateAdvancedSearchOptions(Array.from(searchResults));
}

// ------------------------------------------------------------- //
// --------------------- ADVANCED SEARCH ----------------------- //
// ------------------------------------------------------------- //

// ---------------------- EVENT HANDLING ----------------------- //

// ------------------- search via input field ------------------ //

function advancedInputSearch(e) {
  e.stopPropagation;
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

ingredientsSearchInput.addEventListener("input", advancedInputSearch);
applianceSearchInput.addEventListener("input", advancedInputSearch);
ustensilsSearchInput.addEventListener("input", advancedInputSearch);

// -------------- show all advanced search options -------------- //

// function showAllOptions() {
//   const showAllOptions = document.querySelectorAll(["[data-found='false']"]);
//   showAllRecipes.forEach((recipe) => {
//     recipe.setAttribute("data-found", "true");
//   });
//   // hier noch searchResults.clear() ?
// }

// ---------------------- choosing filter ---------------------- //

function chooseAdvancedSearchOption(e) {
  e.stopPropagation();
  let target = e.target;
  if (searchTags.length === 0) {
    searchTagContainer.classList.add("mt-4");
  }
  if (target.classList.contains("filter-option")) {
    // let filterItem = target.getAttribute("data-filter");
    let filterItem = target.textContent;
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
  // let topic = tag.getAttribute("data-topic");
  // let filterItem = tag.getAttribute("data-filter");
  tag.remove();

  if (searchTags.length === 0) {
    searchTagContainer.classList.remove("mt-4");
  }
  unfilterByTags();
}

// --------------------- TAG FILTER FUNCTION -------------------- //

// add filter tag
function filterByTags(filterItem, topic) {
  let possibleResults;
  if (searchResults.size === 0) {
    possibleResults = recipes;
    console.log("3.1");
  } else {
    possibleResults = Array.from(searchResults);
    searchResults.clear();
    console.log("3.2");
  }

  console.log("possible search results before tag filter:", possibleResults);

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
  const filter = document.querySelector(
    `.filter-option[data-filter='${filterItem}']`
  );

  filter.style.display = "none";
  updateAdvancedSearchOptions(Array.from(searchResults));

  // do I need this?
  searchResultsFilterTags = Array.from(searchResults);

  console.log(filterItem);
  console.log("results of filter tag search:", searchResults);
}

function unfilterByTags() {
  // search Results zurücksetzen, da Suche von vorne laufen muss
  searchResults.clear();

  // wenn es das letzte filter tag war
  if (searchTags.length === 0) {
    // wenn in der main search etwas steht
    if (mainSearch.value.length > 2) {
      searchPossibleResults(mainSearch.value);
      console.log("4.1");
    }
    // wenn in der main search nichts mehr steht
    else {
      showAllRecipes();
      console.log("4.2");
    }
  }

  // wenn es weitere filter tags gibt
  else {
    // wenn in der main search etwas steht
    if (mainSearch.value.length > 2) {
      searchPossibleResults(mainSearch.value);
      // getFilterTagsSearchResults();
      console.log("5.1");
    }
    // wenn in der main search nichts steht
    else {
      getFilterTagsSearchResults();
      console.log("5.2");
    }
  }
}

// // remove filter tag
// function unfilterByTags() {
//   // searchResults.clear();
//   if (searchTags.length === 0) {
//     if (mainSearch.value.length < 3) {
//       showAllRecipes();
//     } else {
//       // neu eingefügt
//       searchResults.clear();
//       searchPossibleResults(mainSearch.value);
//     }
//   } else {
//     // neu eingefügt
//     searchResults.clear();
//     if (mainSearch.value.length > 2) {
//       searchPossibleResults(mainSearch.value);
//     }
//     console.log(Array.from(searchTags));
//     Array.from(searchTags).forEach((tag) => {
//       console.log(searchResults);
//       const filterItem = tag.getAttribute("data-filter").toLowerCase();
//       const topic = tag.getAttribute("data-topic");
//       filterByTags(filterItem, topic);
//     });
//   }
// }

// run filter tag(s) on recipe basis
function getFilterTagsSearchResults() {
  Array.from(searchTags).forEach((tag) => {
    console.log(searchResults);
    const filterItem = tag.getAttribute("data-filter").toLowerCase();
    const topic = tag.getAttribute("data-topic");
    filterByTags(filterItem, topic);
  });
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
        // or len = len - 1;
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}
