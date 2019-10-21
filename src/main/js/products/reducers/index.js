import * as types from 'products/actions/types';

const product = (state = { products: {}, loaded: false }, action) => {
   switch (action.type) {
   case types.SET_PRODUCTS:
      return {
         ...state,
         products: { ...state.products, ...action.payload }
      };
   case types.SET_PRODUCTS_LOADED:
      return {
         ...state,
         loaded: action.payload
      };
   default:
      return state;
   }
};

export default product;
