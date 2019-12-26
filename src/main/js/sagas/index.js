import { all } from 'redux-saga/effects';
import { requestSagas } from 'requests/sagas';
import { apiSagas } from 'api/sagas';
import { productSagas } from 'products/sagas';
import { suggestionSagas } from 'suggestions/sagas';

/**
 * Application redux sagas.
 * 
 * It is just a merge of all the sagas in the application.
 */
export default function* rootSaga() {
   yield all([...requestSagas, ...productSagas, ...apiSagas, ...suggestionSagas]);
}
