export function allPrices(state) {
  return state.prices;
}
export function getTariffById(state) {
  return id => {
    let result;
    state.prices.find(item => {
      item.tariffs.find(el => {
        result = el.id === id ? el : undefined;
        return el.id === id;
      });
    });
    return result;
  };
}
