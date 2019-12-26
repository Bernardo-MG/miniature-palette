import { createSelector } from 'reselect';

const selectDomain = (state) => state.domain;

const selectPaintsMap = (state) => selectDomain(state).paints;

const selectPalettesValues = (state) => Object.values(selectDomain(state).palettes);

export const selectPaletteById = (id) => (state) => selectDomain(state).palettes[id];

function loadPaint(palette, paints) {
   return { ...palette, paints: palette.paints.map((id) => paints[id]) };
}

export const selectPalettes = createSelector(
   [selectPalettesValues, selectPaintsMap],
   (palettes, paints) => {
      return palettes.map((palette) => loadPaint(palette, paints));
   }
);
