// The object
// the string version of a function with /Function(
// in front and )/ at the end.
export const fJsonStingify = obj => {
  return JSON.stringify(obj, function(key, value) {
    if (typeof value === 'function') {
      return '/Function(' + value.toString() + ')/';
    }
    return value;
  });
};
// Convert to an object using a reviver function that
// recognizes the /Function(...)/ value and converts it
// into a function via -shudder- `eval`.
export const fJsonParse = json => {
  return JSON.parse(json, function(key, value) {
    if (
      typeof value === 'string' &&
      value.startsWith('/Function(') &&
      value.endsWith(')/')
    ) {
      value = value.substring(10, value.length - 2);
      return eval('(' + value + ')');
    }
    return value;
  });
};
