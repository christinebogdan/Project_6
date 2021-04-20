export function searchPatternNaive(query, text) {
  const m = query.length;
  const n = text.length;

  for (let i = 0; i < n - m; i++) {
    let j = 0;

    while (j < m) {
      if (text[i + j] != query[j]) {
        break;
      }
      j++;
    }
    if (j === m) {
      return true;
    }
  }
  return false;
}
