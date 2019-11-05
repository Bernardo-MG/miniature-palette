import { combineReducers } from 'redux';
import notification from 'notifications/reducers';
import palette from 'palettes/reducers';
import product from 'products/reducers';

const rootReducer = combineReducers({ notification, palette, product });

export default rootReducer;
