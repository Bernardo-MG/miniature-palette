import { all } from 'redux-saga/effects';
import { paletteSagas } from 'palettes/sagas';
import { productSagas } from 'products/sagas';

/**
 * Application redux sagas.
 * 
 * It is just a merge of all the sagas in the application.
 */
export default function* rootSaga() {
   yield all([...productSagas, ...paletteSagas]);
}
