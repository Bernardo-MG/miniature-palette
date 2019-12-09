import { put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { product } from 'products/schema';

import { READ_PRODUCTS_SUCCESS } from 'products/actions/types';

import { setPaintSuggestions } from 'suggestions/actions';

export function* storePaintSuggestions(action) {
   const normalized = normalize(action.payload, [product]);
   if (normalized.entities.products) {
      yield put(setPaintSuggestions(normalized.entities.products));
   }
}

export const suggestionSagas = [
   takeLatest(READ_PRODUCTS_SUCCESS, storePaintSuggestions)
];
