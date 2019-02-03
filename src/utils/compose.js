export default function compose(HOCS) {
  return function(Component) {
    let C = Component;
    for (let i = HOCS.length - 1; i >= 0; i--) {
      C = HOCS[i](C);
    }
    return C;
  };
}
