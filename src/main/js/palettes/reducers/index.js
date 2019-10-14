import * as types from 'palettes/actions/types';

const palette = (state = { palettes: {} }, action) => {
   switch (action.type) {
   case types.SET_PALETTES:
      return {
         ...state,
         palettes: { ...action.payload }
      };
   default:
      return state;
   }
};

export default palette;
