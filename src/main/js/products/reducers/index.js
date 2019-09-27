import * as types from 'products/actions/types';

const product = (state = { products: {} }, action) => {
   switch (action.type) {
   case types.SET_PRODUCTS:
      return {
         ...state,
         products: { ...state.products, ...action.payload }
      };
   default:
      return state;
   }
};

export default product;
