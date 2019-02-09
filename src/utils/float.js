// more exact calculation
export function sum(a) {
  let sum = a * 100;

  const fn = b => {
    if (b !== undefined) {
      sum += b * 100;
      return fn;
    } else {
      return sum / 100;
    }
  };
  return fn;
}
