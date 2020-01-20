import { PALETTE_RECEIVED } from 'api/actions/types';

const defaultState = {
   paints: {},
   palettes: {}
};

const domain = (state = defaultState, action) => {
   switch (action.type) {
   case PALETTE_RECEIVED:
      return {
         ...state,
         ...action.payload
      };
   default:
      return state;
   }
};

export default domain;
