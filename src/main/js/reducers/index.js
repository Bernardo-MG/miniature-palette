import { combineReducers } from 'redux';
import domain from 'domain/reducers';
import notification from 'notifications/reducers';

const rootReducer = combineReducers({ domain, notification });

export default rootReducer;
