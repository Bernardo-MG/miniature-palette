
export const selectDomain = (state) => state.domain;

export const selectAllPaints = (state) => selectDomain(state).paints;

export const selectAllPalettes = (state) => selectDomain(state).palettes;

export const selectPaletteById = (id) => (state) => selectAllPalettes(state)[id];

function loadPaint(palette, state) {
   return { ...palette, paints: palette.paints.map((id) => selectAllPaints(state)[id]) };
}

export const selectPalettes = (state) => Object.values(selectAllPalettes(state)).map((palette) => loadPaint(palette, state));
