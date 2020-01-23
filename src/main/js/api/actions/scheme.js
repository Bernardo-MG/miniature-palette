import * as types from 'api/actions/types';

export const readSchemes = () => {
   return {
      type: types.READ_SCHEME
   };
};

export const saveScheme = (payload) => {
   return {
      type: types.CREATE_SCHEME,
      payload
   };
};

export const updateScheme = (payload) => {
   return {
      type: types.UPDATE_SCHEME,
      payload
   };
};

export const deleteScheme = (payload) => {
   return {
      type: types.DELETE_SCHEME,
      payload
   };
};
