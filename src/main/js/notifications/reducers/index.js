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
               variation: action.variation,
               message: action.message
            }
         ]
      };
   default:
      return state;
   }
};

export default notification;
