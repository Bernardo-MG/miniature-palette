import * as types from 'notifications/actions/types';

const defaultState = {
   notifications: []
};

const notification = (state = defaultState, action) => {
   switch (action.type) {
   case types.ADD_NOTIFICATION:
      return {
         ...state,
         notifications: [
            ...state.notifications,
            {
               key: action.key,
               variant: action.variant,
               message: action.message
            }
         ]
      };
   case types.DELETE_NOTIFICATION:
      return {
         ...state,
         notifications: state.notifications.filter((notif) => notif.key !== action.key)
      };
   default:
      return state;
   }
};

export default notification;
