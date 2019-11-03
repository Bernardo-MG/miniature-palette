import * as types from 'notifications/actions/types';

export const notifySuccess = (key, message) => {
   return {
      type: types.NOTIFY,
      variant: 'success',
      key,
      message
   };
};
