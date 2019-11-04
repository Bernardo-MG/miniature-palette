import * as types from 'notifications/actions/types';

export const notifySuccess = (key, message) => {
   return {
      type: types.ADD_NOTIFICATION,
      variant: 'success',
      key,
      message
   };
};
