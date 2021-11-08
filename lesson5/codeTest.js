function joinOr(array, delimeter = ', ', joining = 'or') {
  let stringExceptLast = array.slice(0,array.length - 1).join(delimeter) + ` ${joining} ${array[array.length - 1]}`
  console.log (stringExceptLast);
}

joinOr([1, 2])                   // => "1 or 2"
joinOr([1, 2, 3])                // => "1, 2, or 3"
joinOr([1, 2, 3], '; ')          // => "1; 2; or 3"
joinOr([1, 2, 3], ', ', 'and')   // => "1, 2, and 3"