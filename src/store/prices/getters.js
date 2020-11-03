export function allPrices(state) {
  return state.prices;
}
export function getTariffById(state) {
  return id => {
    let result;
    for (const item in state.prices) {
      for (const elem in state.prices[item].tariffs) {
        for (const tariff in state.prices[item].tariffs) {
          if (state.prices[item].tariffs[tariff].id === id) {
            result = state.prices[item].tariffs[tariff];
            result.groupName = state.prices[item].name;
            return result;
          }
        }
      }
    }
  };
}
