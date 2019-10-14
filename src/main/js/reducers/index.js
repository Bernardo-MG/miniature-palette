import { combineReducers } from 'redux';
import palette from 'palettes/reducers';
import product from 'products/reducers';

const rootReducer = combineReducers({ palette, product });

export default rootReducer;
