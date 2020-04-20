import { SCHEME_RECEIVED } from 'api/actions/types';

const defaultState = {
   paints: {},
   palettes: {},
   schemes: {}
};

const domain = (state = defaultState, action) => {
   switch (action.type) {
   case SCHEME_RECEIVED:
      return {
         ...state,
         ...action.payload
      };
   default:
      return state;
   }
};

export default domain;
