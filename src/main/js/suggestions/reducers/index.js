import * as types from 'suggestions/actions/types';

const suggestion = (state = { paints: [], loadedPaints: false }, action) => {
   switch (action.type) {
   case types.SET_PAINT_SUGGESTIONS:
      return {
         ...state,
         paints: [...action.payload]
      };
   case types.SET_PAINT_SUGGESTIONS_LOADED:
      return {
         ...state,
         loadedPaints: action.payload
      };
   default:
      return state;
   }
};

export default suggestion;
