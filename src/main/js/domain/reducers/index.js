import { PALETTES_RECEIVED, PALETTE_GROUPS_RECEIVED } from 'api/actions/types';

const defaultState = {
   paints: {},
   palettes: {}
};

const domain = (state = defaultState, action) => {
   switch (action.type) {
   case PALETTES_RECEIVED:
   case PALETTE_GROUPS_RECEIVED:
      return {
         ...state,
         ...action.payload
      };
   default:
      return state;
   }
};

export default domain;
