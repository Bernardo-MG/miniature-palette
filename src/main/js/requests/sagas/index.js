import { put, takeLatest } from 'redux-saga/effects';

import * as types from 'requests/actions/types';

import { notifyError } from 'notifications/actions';

export function* notifyFailure(action) {
   if (Array.isArray(action.payload.content)) {
      for (let index = 0; index < action.payload.content.length; index += 1) {
         yield put(notifyError(action.payload.content[index]));
      }
   } else {
      let message = 'Request failure';

      if (action.payload.message) {
         message = action.payload.message;
      }

      yield put(notifyError(message));
   }
}

export const requestSagas = [
   takeLatest(types.REQUEST_FAILURE, notifyFailure)
];
