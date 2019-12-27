import { put, takeLatest } from 'redux-saga/effects';

import * as types from 'api/actions/types';

import { notifySuccess } from 'notify/actions';

export function* notifySaved() {
   yield put(notifySuccess('saved_message'));
}

export function* notifyUpdated() {
   yield put(notifySuccess('updated_message'));
}

export const paletteNotificationSagas = [
   takeLatest(types.PALETTE_SAVED, notifySaved),
   takeLatest(types.PALETTE_UPDATED, notifyUpdated)
];
