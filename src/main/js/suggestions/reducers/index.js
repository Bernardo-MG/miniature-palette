import * as types from 'suggestions/actions/types';

const suggestion = (state = { paints: {} }, action) => {
   switch (action.type) {
   case types.SET_PAINT_SUGGESTIONS:
      return {
         ...state,
         paints: { ...action.payload }
      };
   default:
      return state;
   }
};

export default suggestion;
