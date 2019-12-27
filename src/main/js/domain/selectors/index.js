import { createSelector } from 'reselect';

function loadPaint(palette, paints) {
   let result;

   if (palette) {
      result = { ...palette, paints: palette.paints.map((id) => paints[id]) };
   } else {
      result = { name: '', paints: [] };
   }

   return result;
}

const selectDomain = (state) => state.domain;

const selectPaintsMap = (state) => selectDomain(state).paints;

const selectPalettesValues = (state) => Object.values(selectDomain(state).palettes);

const selectPalettesMap = (state) => selectDomain(state).palettes;

export const selectPaletteById = (id) => createSelector(
   [selectPalettesMap, selectPaintsMap],
   (palettes, paints) => {
      return loadPaint(palettes[id], paints);
   }
);

export const selectPalettes = createSelector(
   [selectPalettesValues, selectPaintsMap],
   (palettes, paints) => {
      return palettes.map((palette) => loadPaint(palette, paints));
   }
);

export const selectPaletteGroups = (state) => Object.values(selectDomain(state).paletteGroups);
