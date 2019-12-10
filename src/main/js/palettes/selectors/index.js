
export const selectDomain = (state) => state.domain;

export const selectPalettes = (state) => selectDomain(state).palettes;

export const selectPalettesById = (id) => (state) => selectPalettes(state)[id];

export const selectPaletteOptions = (state) => Object.values(selectPalettes(state));
