
export const selectProducts = (state) => state.product.products;

export const selectSuggestions = (state) => Object.values(selectProducts(state)).map((product) => product.name);

export const selectLoaded = (state) => state.product.loaded;
