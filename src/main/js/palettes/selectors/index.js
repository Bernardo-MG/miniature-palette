
export const selectDomain = (state) => state.domain;

export const selectAllPalettes = (state) => selectDomain(state).palettes;

export const selectPaletteById = (id) => (state) => selectAllPalettes(state)[id];

export const selectPalettes = (state) => Object.values(selectAllPalettes(state));
