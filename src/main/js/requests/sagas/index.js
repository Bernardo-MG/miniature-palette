import { put, takeLatest } from 'redux-saga/effects';

import * as types from 'requests/actions/types';

import { notifyError } from 'notifications/actions';

export function* notifyFailure(action) {
   let message = 'Request failure';

   if (action.payload.message) {
      message = action.payload.message;
   }
   console.log(action.payload);
   yield put(notifyError(new Date().getTime() + Math.random(), message));
}

export const requestSagas = [
   takeLatest(types.REQUEST_FAILURE, notifyFailure)
];
