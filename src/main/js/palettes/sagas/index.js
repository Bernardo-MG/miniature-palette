import { put, takeLatest, call } from 'redux-saga/effects';
import api from 'api';
import { normalize } from 'normalizr';
import { palette } from 'palettes/schema';

import * as types from 'palettes/actions/types';

import { readSuccess, setPalettes, savePaletteSuccess } from 'palettes/actions';
import { notifySuccess } from 'notifications/actions';
import { requestFailure } from 'requests/actions';

export function* read() {
   let response;
   try {
      response = yield call(api.PaletteGroups.all);
      yield put(readSuccess(response));
   } catch (err) {
      yield put(requestFailure(err));
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
      if (response.status === 'success') {
         yield put(savePaletteSuccess(response));
      } else {
         yield put(requestFailure(response));
      }
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export function* notifySaved() {
   yield put(notifySuccess('saved_message'));
}

export const paletteSagas = [
   takeLatest(types.READ_PALETTES, read),
   takeLatest(types.READ_PALETTES_SUCCESS, storePalettes),
   takeLatest(types.REGISTER_PALETTE_GROUP, save),
   takeLatest(types.REGISTER_PALETTE_GROUP_SUCCESS, notifySaved),
   takeLatest(types.SAVE_PALETTE, save),
   takeLatest(types.SAVE_PALETTE_SUCCESS, notifySaved)
];
