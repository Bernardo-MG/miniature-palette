import '@babel/polyfill';
import { update } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import api from 'api';

const func = update("TEST", api.Palettes);
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);

describe('CRUD update requests saga', () => {
   it('tries to update', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
         ).toEqual(
            call(api.Palettes.update, 'abc')
      )
   })
});
