// ----------------------- KMP ALGORITHM ----------------------- //

// pattern search function

export function searchPattern(query, text) {
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
