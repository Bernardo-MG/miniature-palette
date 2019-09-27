import { combineReducers } from 'redux';
import product from 'products/reducers';

const rootReducer = combineReducers({ product });

export default rootReducer;
