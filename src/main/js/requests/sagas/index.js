import { put, takeLatest } from 'redux-saga/effects';

import * as types from 'requests/actions/types';

import { notifyError } from 'notifications/actions';

function getMessage(source) {
   let message = 'Request failure';

   if ((source) && (typeof source === 'string')) {
      message = source;
   }

   return message;
}

export function* notifyFailure(action) {
   if (Array.isArray(action.payload.content)) {
      for (let index = 0; index < action.payload.content.length; index += 1) {
         const message = getMessage(action.payload.content[index]);

         yield put(notifyError(message));
      }
   } else {
      const message = getMessage(action.payload.message);

      yield put(notifyError(message));
   }
}

export const requestSagas = [
   takeLatest(types.REQUEST_FAILURE, notifyFailure)
];
