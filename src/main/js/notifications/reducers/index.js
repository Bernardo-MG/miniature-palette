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
               timestamp: action.timestamp,
               variant: action.variant,
               message: action.message
            }
         ]
      };
   case types.DELETE_NOTIFICATION:
      return {
         ...state,
         notifications: state.notifications.filter((notif) => notif.timestamp !== action.timestamp)
      };
   default:
      return state;
   }
};

export default notification;
