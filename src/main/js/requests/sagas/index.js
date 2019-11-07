import { put, takeLatest } from 'redux-saga/effects';

import * as types from 'requests/actions/types';

import { notifyError } from 'notifications/actions';

export function* notifyFailure() {
   yield put(notifyError(new Date().getTime() + Math.random(), 'request_failure'));
}

export const requestSagas = [
   takeLatest(types.REQUEST_FAILURE, notifyFailure)
];
