
export const selectProducts = (state) => state.product.products;

export const selectSuggestions = (state) => selectProducts(state).map((product) => product.name);
