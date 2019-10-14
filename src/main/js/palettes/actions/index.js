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

export const success = (payload) => {
   return {
      type: types.READ_PALETTES_SUCCESS,
      payload
   };
};

export const failure = (payload) => {
   return {
      type: types.READ_PALETTES_FAILURE,
      payload
   };
};
