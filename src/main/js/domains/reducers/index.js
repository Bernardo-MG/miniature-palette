import { PALETTES_READ } from 'palettes/actions/types';
import { SET_PRODUCTS } from 'products/actions/types';

const defaultState = {
   palettes: {},
   products: {}
};

const domain = (state = defaultState, action) => {
   switch (action.type) {
   case PALETTES_READ:
      return {
         ...state,
         palettes: { ...action.payload }
      };
   case SET_PRODUCTS:
      return {
         ...state,
         products: { ...action.payload }
      };
   default:
      return state;
   }
};

export default domain;
