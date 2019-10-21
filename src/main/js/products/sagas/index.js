import { put, takeLatest, call } from 'redux-saga/effects';
import { READ_PRODUCTS, READ_PRODUCTS_SUCCESS } from 'products/actions/types';
import { success, failure, setProducts } from 'products/actions';
import api from 'api';
import { normalize } from 'normalizr';
import { product } from 'products/schema';

export function* read() {
   let response;
   try {
      response = yield call(api.Products.all);
      yield put(success(response));
   } catch (err) {
      yield put(failure(err));
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
