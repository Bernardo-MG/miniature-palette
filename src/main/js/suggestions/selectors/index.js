
export const selectPaints = (state) => state.suggestion.paints;

export const selectSuggestions = (state) => Object.values(selectPaints(state)).map((product) => `${product.name} (${product.code})`);

export const selectLoaded = (state) => state.suggestion.loadedPaints;
