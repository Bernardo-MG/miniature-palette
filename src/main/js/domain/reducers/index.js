import { PALETTES_READ } from 'domain/actions/types';

const defaultState = {
   palettes: {},
   paints: {},
   products: {}
};

const domain = (state = defaultState, action) => {
   let palettesState;

   if (action.type === PALETTES_READ) {
      if (action.payload) {
         palettesState = {
            ...state,
            palettes: { ...action.payload.palettes },
            paints: { ...action.payload.paints }
         };
      } else {
         palettesState = {
            ...state
         };
      }
   }

   switch (action.type) {
   case PALETTES_READ:
      return palettesState;
   default:
      return state;
   }
};

export default domain;
