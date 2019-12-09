import { combineReducers } from 'redux';
import notification from 'notifications/reducers';
import palette from 'palettes/reducers';
import product from 'products/reducers';
import suggestion from 'suggestions/reducers';

const rootReducer = combineReducers({ notification, palette, product, suggestion });

export default rootReducer;
