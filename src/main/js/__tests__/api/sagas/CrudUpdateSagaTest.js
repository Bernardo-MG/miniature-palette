import '@babel/polyfill';
import { update } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

const operation = (input) => input;
const func = update("TEST", { update: operation });
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);

describe('CRUD update requests saga', () => {
   it('tries to update', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
      ).toEqual(
         call(operation, 'abc')
      )
   })
});
