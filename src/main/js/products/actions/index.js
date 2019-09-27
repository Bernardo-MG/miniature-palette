import { SET_PRODUCTS } from 'products/actions/types';

export const setProducts = (payload) => {
   return {
      type: SET_PRODUCTS,
      payload
   };
};
