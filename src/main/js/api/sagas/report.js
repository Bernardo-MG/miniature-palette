import { put, takeLatest, call } from 'redux-saga/effects';

import { requestFailure } from 'api/actions';

export const report = (code, api) => {

   function* generate(action) {
      try {
         yield call(api.report, action.payload);
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   return [
      takeLatest(`GENERATE_${code}_REPORT`, generate)
   ];
};
