import { put, takeLatest, call } from 'redux-saga/effects';

import { requestFailure } from 'api/actions';

export const async = (code, api) => {

   function* read() {
      let response;
      try {
         response = yield call(api.all);
         yield put({ type: `${code}_RECEIVED`, payload: response });
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   function* save(action) {
      let response;
      try {
         response = yield call(api.save, action.payload);
         if (response.status === 'success') {
            yield put({ type: `${code}_SAVED`, payload: response });
         } else {
            yield put(requestFailure(response));
         }
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   function* update(action) {
      let response;
      try {
         response = yield call(api.update, action.payload);
         if (response.status === 'success') {
            yield put({ type: `${code}_UPDATED`, payload: response });
         } else {
            yield put(requestFailure(response));
         }
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   function* del(action) {
      let response;
      try {
         response = yield call(api.delete, action.payload);
         if (response.status === 'success') {
            yield put({ type: `${code}_DELETED`, payload: response });
         } else {
            yield put(requestFailure(response));
         }
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   function* report(action) {
      try {
         yield call(api.report, action.payload);
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   return [
      takeLatest(`READ_${code}`, read),
      takeLatest(`SAVE_${code}`, save),
      takeLatest(`UPDATE_${code}`, update),
      takeLatest(`DELETE_${code}`, del),
      takeLatest(`GENERATE_${code}_REPORT`, report)
   ];
};
