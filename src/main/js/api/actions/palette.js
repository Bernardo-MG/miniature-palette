import * as types from 'api/actions/types';

export const readPalettes = () => {
   return {
      type: types.READ_PALETTE
   };
};

export const savePalette = (payload) => {
   return {
      type: types.SAVE_PALETTE,
      payload
   };
};

export const updatePalette = (payload) => {
   return {
      type: types.UPDATE_PALETTE,
      payload
   };
};

export const deletePalette = (payload) => {
   return {
      type: types.DELETE_PALETTE,
      payload
   };
};

export const paletteReport = (payload) => {
   return {
      type: types.GENERATE_PALETTE_REPORT,
      payload
   };
};
