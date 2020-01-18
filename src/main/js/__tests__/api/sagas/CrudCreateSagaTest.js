import '@babel/polyfill';
import { create } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

const operation = (input) => input;
const func = create("TEST", { create: operation });
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);

describe('CRUD create requests saga', () => {
   it('tries to create', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
      ).toEqual(
         call(operation, 'abc')
      )
   })
});
