function joinOr(array, delimeter = ', ', joining = 'or') {
  return array.slice(0,array.length - 1).join(delimeter) + 
  ` ${joining} ${array[array.length - 1]}`;
}

joinOr([1, 2])                   // => "1 or 2"
joinOr([1, 2, 3])                // => "1, 2, or 3"
joinOr([1, 2, 3], '; ')          // => "1; 2; or 3"
joinOr([1, 2, 3], ', ', 'and')   // => "1, 2, and 3"