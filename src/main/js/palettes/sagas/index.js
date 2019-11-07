import { put, takeLatest, call } from 'redux-saga/effects';
import { READ_PALETTES, READ_PALETTES_SUCCESS, SAVE_PALETTES } from 'palettes/actions/types';
import { readSuccess, readFailure, setPalettes, saveSuccess, saveFailure } from 'palettes/actions';
import api from 'api';
import { normalize } from 'normalizr';
import { palette } from 'palettes/schema';

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

export const paletteSagas = [
   takeLatest(READ_PALETTES, read),
   takeLatest(READ_PALETTES_SUCCESS, storePalettes),
   takeLatest(SAVE_PALETTES, save)
];
