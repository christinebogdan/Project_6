const mainSearch = document.getElementById("searchField");
const searchResults = new Set();

let previousQuery = "";

mainSearch.addEventListener("input", (e) => {
  let query = e.target.value.toLowerCase();
  if (query.length >= 3) {
    runMainSearchQuery(query);
  }
  if (query.length < 3) {
    // everything visible
  }
});

function runMainSearchQuery(query) {
  if (
    searchPattern(previousQuery, query) &&
    query.length - previousQuery.length === 1
  ) {
    const previousSearchResults = Array.from(searchResults);
    console.log(previousSearchResults);

    // for (let i = 0; i < previousSearchResults.length; i++) {
    //   // iterate over previous Search Results
    //   runMainSearchQuery(query);
    // }
  }
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeID = recipe.id;
    const recipeDOMElement = document.getElementById(recipeID);
    recipeDOMElement.setAttribute("data-found", "false");
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients;
    const recipeDescription = recipe.description.toLowerCase();

    if (searchPattern(query, recipeTitle)) {
      console.log("found in title of recipe:", recipeID);
      searchResults.add(recipe);
      recipeDOMElement.setAttribute("data-found", "true");
    }

    if (searchPattern(query, recipeDescription)) {
      console.log("found in description of recipe:", recipeID);
      searchResults.add(recipe);
      recipeDOMElement.setAttribute("data-found", "true");
    }

    recipeIngredients.forEach((element) => {
      if (searchPattern(query, element.ingredient.toLowerCase())) {
        console.log("found in ingredients of recipe:", recipeID);
        searchResults.add(recipe);
        recipeDOMElement.setAttribute("data-found", "true");
      }
    });
  }
  previousQuery = query;
  console.log(searchResults);
}

// if previous Query is part of query and query is bigger than previous Query
// only search visible recipes

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
        console.log("found at", i - j);
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
