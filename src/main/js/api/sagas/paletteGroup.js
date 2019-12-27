import { put, takeLatest, call } from 'redux-saga/effects';
import api from 'api';

import * as types from 'api/actions/types';

import { palettesRead, paletteSaved, paletteUpdated, requestFailure } from 'api/actions';

export function* read() {
   let response;
   try {
      response = yield call(api.PaletteGroups.all);
      yield put(palettesRead(response));
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export function* save(action) {
   let response;
   try {
      response = yield call(api.PaletteGroups.save, action.payload);
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
      response = yield call(api.PaletteGroups.update, action.payload);
      if (response.status === 'success') {
         yield put(paletteUpdated(response));
      } else {
         yield put(requestFailure(response));
      }
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export const paletteGroupApiSagas = [
   takeLatest(types.READ_PALETTE_GROUPS, read),
   takeLatest(types.SAVE_PALETTE_GROUP, save),
   takeLatest(types.UPDATE_PALETTE_GROUP, update)
];
