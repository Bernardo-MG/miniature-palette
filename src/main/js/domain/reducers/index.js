import { PALETTES_RECEIVED, PALETTE_GROUPS_RECEIVED } from 'api/actions/types';

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
   case PALETTE_GROUPS_RECEIVED:
      return {
         ...state,
         paletteGroups: { ...action.payload.paletteGroups },
         palettes: { ...action.payload.palettes },
         paints: { ...action.payload.paints }
      };
   default:
      return state;
   }
};

export default domain;
