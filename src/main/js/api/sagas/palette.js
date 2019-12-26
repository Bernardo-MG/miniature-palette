import { put, takeLatest, call } from 'redux-saga/effects';
import api from 'api';

import * as types from 'domain/actions/types';

import { palettesRead, paletteSaved, paletteUpdated } from 'domain/actions';
import { requestFailure } from 'api/actions';

export function* read() {
   let response;
   try {
      response = yield call(api.Palettes.all);
      yield put(palettesRead(response));
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export function* save(action) {
   let response;
   try {
      response = yield call(api.Palettes.save, action.payload);
      if (response.status === 'success') {
         yield put(paletteSaved(response));
      } else {
         yield put(requestFailure(response));
      }
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export function* update(action) {
   let response;
   try {
      response = yield call(api.Palettes.update, action.payload);
      if (response.status === 'success') {
         yield put(paletteUpdated(response));
      } else {
         yield put(requestFailure(response));
      }
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export const paletteApiSagas = [
   takeLatest(types.READ_PALETTES, read),
   takeLatest(types.SAVE_PALETTE, save),
   takeLatest(types.UPDATE_PALETTE, update)
];
