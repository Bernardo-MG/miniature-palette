import { PALETTES_RECEIVED } from 'api/actions/types';

const defaultState = {
   paints: {},
   palettes: {},
   paletteGroups: {}
};

const domain = (state = defaultState, action) => {
   let palettesState;

   if (action.type === PALETTES_RECEIVED) {
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
   case PALETTES_RECEIVED:
      return palettesState;
   default:
      return state;
   }
};

export default domain;
