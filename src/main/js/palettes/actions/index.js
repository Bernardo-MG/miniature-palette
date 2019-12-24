import * as types from 'palettes/actions/types';

export const readPalettes = () => {
   return {
      type: types.READ_PALETTES
   };
};

export const readSuccess = (payload) => {
   return {
      type: types.READ_PALETTES_SUCCESS,
      payload
   };
};

export const savePalette = (payload) => {
   return {
      type: types.SAVE_PALETTE,
      payload
   };
};

export const savePaletteSuccess = (payload) => {
   return {
      type: types.SAVE_PALETTE_SUCCESS,
      payload
   };
};

export const updatePalette = (payload) => {
   return {
      type: types.UPDATE_PALETTE,
      payload
   };
};

export const updatePaletteSuccess = (payload) => {
   return {
      type: types.UPDATE_PALETTE_SUCCESS,
      payload
   };
};

export const registerPaletteGroup = (payload) => {
   return {
      type: types.REGISTER_PALETTE_GROUP,
      payload
   };
};

export const registerPaletteGroupSuccess = (payload) => {
   return {
      type: types.REGISTER_PALETTE_GROUP_SUCCESS,
      payload
   };
};
