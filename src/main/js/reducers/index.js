import { combineReducers } from 'redux';
import domain from 'domains/reducers';
import notification from 'notifications/reducers';
import suggestion from 'suggestions/reducers';

const rootReducer = combineReducers({ domain, notification, suggestion });

export default rootReducer;
