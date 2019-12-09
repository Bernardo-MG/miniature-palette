import { put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { product } from 'products/schema';

import { READ_PRODUCTS_SUCCESS } from 'products/actions/types';

import { setPaintSuggestions } from 'suggestions/actions';

function toMap(value) {
   return { value: `${value.name} (${value.code})`, label: `${value.name} (${value.code})` };
}

export function* storePaintSuggestions(action) {
   const normalized = normalize(action.payload, [product]);
   if (normalized.entities.products) {
      const values = Object.values(normalized.entities.products);
      const suggestions = values.map(toMap);
      yield put(setPaintSuggestions(suggestions));
   }
}

export const suggestionSagas = [
   takeLatest(READ_PRODUCTS_SUCCESS, storePaintSuggestions)
];
