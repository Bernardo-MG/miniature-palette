import '@babel/polyfill';
import { read } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import api from 'api';

const func = read("TEST", api.Palettes);
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);
const generatorEmpty = cloneableGenerator(func)({}, 0);

describe('CRUD read requests saga', () => {
   it('tries to read', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
         ).toEqual(
            call(api.Palettes.all)
      )
   }),

   it('sends success action', () => {
      const gen = generator.clone();
      gen.next();
      expect(
         gen.next().value
         ).toEqual(
            put({ type: `TEST_RECEIVED`, payload: undefined })
      )
   }),

   it('tries to search when the payload is undefined', () => {
      const gen = generatorEmpty.clone();
      expect(
         gen.next().value
         ).toEqual(
            call(api.Palettes.all)
      )
   })
});
