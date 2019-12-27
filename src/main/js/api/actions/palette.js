import * as types from 'api/actions/types';

export const readPalettes = () => {
   return {
      type: types.READ_PALETTES
   };
};

export const palettesRead = (payload) => {
   return {
      type: types.PALETTES_RECEIVED,
      payload
   };
};

export const savePalette = (payload) => {
   return {
      type: types.SAVE_PALETTE,
      payload
   };
};

export const paletteSaved = (payload) => {
   return {
      type: types.PALETTE_SAVED,
      payload
   };
};

export const updatePalette = (payload) => {
   return {
      type: types.UPDATE_PALETTE,
      payload
   };
};

export const paletteUpdated = (payload) => {
   return {
      type: types.PALETTE_UPDATED,
      payload
   };
};
