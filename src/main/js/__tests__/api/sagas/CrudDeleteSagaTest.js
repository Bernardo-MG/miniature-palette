import '@babel/polyfill';
import { del } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import api from 'api';

const func = del("TEST", api.Palettes);
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);

describe('CRUD delete requests saga', () => {
   it('tries to delete', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
         ).toEqual(
            call(api.Palettes.delete, 'abc')
      )
   })
});
