import * as types from 'suggestions/actions/types';

export const setSuggestions = (payload) => {
   return {
      type: types.SET_PAINT_SUGGESTIONS,
      payload
   };
};
