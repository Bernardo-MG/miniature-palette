
export const selectDomain = (state) => state.domain;

export const selectPalettes = (state) => selectDomain(state).palettes;

export const selectPaletteOptions = (state) => Object.values(selectPalettes(state));
