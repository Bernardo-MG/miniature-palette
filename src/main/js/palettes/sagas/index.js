import { put, takeLatest, call } from 'redux-saga/effects';
import api from 'api';
import { normalize } from 'normalizr';
import { palette } from 'palettes/schema';

import * as types from 'palettes/actions/types';

import { readSuccess, readFailure, setPalettes, saveSuccess, saveFailure } from 'palettes/actions';
import { notifySuccess } from 'notifications/actions';

export function* read() {
   let response;
   try {
      response = yield call(api.Palettes.all);
      yield put(readSuccess(response));
   } catch (err) {
      yield put(readFailure(err));
   }
}

export function* storePalettes(action) {
   const normalized = normalize(action.payload, [palette]);
   if (normalized.entities.palettes) {
      yield put(setPalettes(normalized.entities.palettes));
   }
}

export function* save(action) {
   let response;
   try {
      response = yield call(api.Palettes.save, action.payload);
      yield put(saveSuccess(response));
   } catch (err) {
      yield put(saveFailure(err));
   }
}

export function* notifySaved() {
   yield put(notifySuccess(new Date().getTime() + Math.random(), 'saved_message'));
}

export const paletteSagas = [
   takeLatest(types.READ_PALETTES, read),
   takeLatest(types.READ_PALETTES_SUCCESS, storePalettes),
   takeLatest(types.SAVE_PALETTES, save),
   takeLatest(types.SAVE_PALETTES_SUCCESS, notifySaved)
];
