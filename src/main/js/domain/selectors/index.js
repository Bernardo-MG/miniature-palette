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

function loadPalette(scheme, palettes, paints) {
   let result;

   if (scheme) {
      result = { ...scheme, palettes: scheme.palettes.map((id) => loadPaint(palettes[id], paints)) };
   } else {
      result = { name: '', palettes: [] };
   }

   return result;
}

const selectDomain = (state) => state.domain;

const selectPaintsMap = (state) => selectDomain(state).paints;

const selectPalettesMap = (state) => selectDomain(state).palettes;

const selectSchemesValues = (state) => Object.values(selectDomain(state).schemes);

export const selectSchemes = createSelector(
   [selectSchemesValues, selectPalettesMap, selectPaintsMap],
   (schemes, palettes, paints) => {
      return schemes.map((scheme) => loadPalette(scheme, palettes, paints));
   }
);
