import * as types from 'palettes/actions/types';

export const setPalettes = (payload) => {
   return {
      type: types.SET_PALETTES,
      payload
   };
};

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

export const savePalettes = (payload) => {
   return {
      type: types.SAVE_PALETTES,
      payload
   };
};

export const saveSuccess = (payload) => {
   return {
      type: types.SAVE_PALETTES_SUCCESS,
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
