import { put, takeLatest, call } from 'redux-saga/effects';
import { READ_PALETTES, READ_PALETTES_SUCCESS } from 'palettes/actions/types';
import { success, failure, setPalettes } from 'palettes/actions';
import api from 'api';
import { normalize } from 'normalizr';
import { palette } from 'palettes/schema';

export function* read() {
   let response;
   try {
      response = yield call(api.Palettes.all);
      yield put(success(response));
   } catch (err) {
      yield put(failure(err));
   }
}

export function* storePalettes(action) {
   const normalized = normalize(action.payload, [palette]);
   yield put(setPalettes(normalized.entities.palettes));
}

export const paletteSagas = [
   takeLatest(READ_PALETTES, read),
   takeLatest(READ_PALETTES_SUCCESS, storePalettes)
];
