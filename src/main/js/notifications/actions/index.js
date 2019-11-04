import * as types from 'notifications/actions/types';

export const notifySuccess = (key, message) => {
   return {
      type: types.ADD_NOTIFICATION,
      variation: 'success',
      key,
      message
   };
};
