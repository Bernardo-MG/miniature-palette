import * as types from 'notifications/actions/types';

export const notifySuccess = (key, message) => {
   return {
      type: types.ADD_NOTIFICATION,
      variant: 'success',
      key,
      message
   };
};

export const notifyWarning = (key, message) => {
   return {
      type: types.ADD_NOTIFICATION,
      variant: 'warning',
      key,
      message
   };
};

export const notifyError = (key, message) => {
   return {
      type: types.ADD_NOTIFICATION,
      variant: 'error',
      key,
      message
   };
};

export const removeNotification = (key) => {
   return {
      type: types.DELETE_NOTIFICATION,
      key
   };
};
