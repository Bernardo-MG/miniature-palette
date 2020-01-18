import { put, takeLatest, call } from 'redux-saga/effects';

import { requestFailure } from 'api/actions';

export const create = (code, api) => {

   function* gen(action) {
      let response;
      try {
         response = yield call(api.create, action.payload);
         if (response.status === 'success') {
            yield put({ type: `${code}_SAVED`, payload: response });
         } else {
            yield put(requestFailure(response));
         }
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   return gen;
};

export const read = (code, api) => {

   function* gen() {
      let response;
      try {
         response = yield call(api.all);
         yield put({ type: `${code}_RECEIVED`, payload: response });
      } catch (err) {
         yield put(requestFailure(err));
      }
   }

   return gen;
};

export const update = (code, api) => {

   function* gen(action) {
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

   return gen;
};

export const del = (code, api) => {

   function* gen(action) {
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

   return gen;
};

export const crud = (code, api) => {

   return [
      takeLatest(`SAVE_${code}`, create(code, api)),
      takeLatest(`READ_${code}`, read(code, api)),
      takeLatest(`UPDATE_${code}`, update(code, api)),
      takeLatest(`DELETE_${code}`, del(code, api))
   ];
};
