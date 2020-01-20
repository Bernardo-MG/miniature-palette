import '@babel/polyfill';
import { del } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

const operation = (input) => input;
const func = del("TEST", { delete: operation });
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);

describe('CRUD delete requests saga', () => {
   it('tries to delete', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
      ).toEqual(
         call(operation, 'abc')
      )
   })
});
