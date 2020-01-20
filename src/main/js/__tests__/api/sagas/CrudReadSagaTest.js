import '@babel/polyfill';
import { read } from 'api/sagas/crud';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

const operation = (input) => input;
const func = read("TEST", { read: operation });
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);
const generatorEmpty = cloneableGenerator(func)({}, 0);

describe('CRUD read requests saga', () => {
   it('tries to read', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
      ).toEqual(
         call(operation, 'abc')
      )
   }),

//   it('sends success action', () => {
//      const gen = generator.clone();
//      gen.next();
//      expect(
//         gen.next().value
//      ).toEqual(
//         put({ type: `TEST_RECEIVED`, payload: undefined })
//      )
//   }),

   it('tries to search when the payload is undefined', () => {
      const gen = generatorEmpty.clone();
      expect(
         gen.next().value
      ).toEqual(
         call(operation, undefined)
      )
   })
});
