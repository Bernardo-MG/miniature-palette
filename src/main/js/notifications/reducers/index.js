import * as types from 'notifications/actions/types';

const defaultState = {
   notifications: {}
};

const notification = (state = defaultState, action) => {
   switch (action.type) {
   case types.NOTIFY:
      return {
         ...state,
         notifications: [
            ...state.notifications,
            {
               key: action.key,
               ...action.notification
            }
         ]
      };
   default:
      return state;
   }
};

export default notification;
