import { all } from 'redux-saga/effects';
import { requestSagas } from 'requests/sagas';
import { paletteSagas } from 'palettes/sagas';
import { productSagas } from 'products/sagas';

/**
 * Application redux sagas.
 * 
 * It is just a merge of all the sagas in the application.
 */
export default function* rootSaga() {
   yield all([...requestSagas, ...productSagas, ...paletteSagas]);
}
