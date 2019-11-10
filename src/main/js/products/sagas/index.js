import { put, takeLatest, call } from 'redux-saga/effects';
import api from 'api';
import { normalize } from 'normalizr';
import { product } from 'products/schema';

import { READ_PRODUCTS, READ_PRODUCTS_SUCCESS } from 'products/actions/types';

import { success, setProducts } from 'products/actions';
import { requestFailure } from 'requests/actions';

export function* read() {
   let response;
   try {
      response = yield call(api.Products.all);
      yield put(success(response));
   } catch (err) {
      yield put(requestFailure(err));
   }
}

export function* storeProducts(action) {
   const normalized = normalize(action.payload, [product]);
   if (normalized.entities.products) {
      yield put(setProducts(normalized.entities.products));
   }
}

export const productSagas = [
   takeLatest(READ_PRODUCTS, read),
   takeLatest(READ_PRODUCTS_SUCCESS, storeProducts)
];
