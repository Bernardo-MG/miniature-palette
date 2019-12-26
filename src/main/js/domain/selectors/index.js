import { createSelector } from 'reselect';

function loadPaint(palette, paints) {
   return { ...palette, paints: palette.paints.map((id) => paints[id]) };
}

const selectDomain = (state) => state.domain;

const selectPaintsMap = (state) => selectDomain(state).paints;

const selectPalettesValues = (state) => Object.values(selectDomain(state).palettes);

const selectPalettesMap = (state) => Object.values(selectDomain(state).palettes);

export const selectPaletteById = createSelector(
   [selectPalettesMap, selectPaintsMap],
   (palettes, paints) => {
      return palettes.map((palette) => loadPaint(palette, paints));
   }
);

export const selectPalettes = createSelector(
   [selectPalettesValues, selectPaintsMap],
   (palettes, paints) => {
      return palettes.map((palette) => loadPaint(palette, paints));
   }
);
