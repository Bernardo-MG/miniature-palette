
export const selectPalettes = (state) => state.palette.palettes;

export const selectPaletteOptions = (state) => Object.values(selectPalettes(state));
