import * as types from 'products/actions/types';

export const setProducts = (payload) => {
   return {
      type: types.SET_PRODUCTS,
      payload
   };
};

export const read = (payload) => {
   return {
      type: types.READ_PRODUCTS,
      payload
   };
};

export const success = (payload) => {
   return {
      type: types.READ_PRODUCTS_SUCCESS,
      payload
   };
};

export const failure = (payload) => {
   return {
      type: types.READ_PRODUCTS_FAILURE,
      payload
   };
};