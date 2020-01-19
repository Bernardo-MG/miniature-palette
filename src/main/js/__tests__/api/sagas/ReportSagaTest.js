import '@babel/polyfill';
import { read } from 'api/sagas/report';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

const operation = (input) => input;
const func = read({ report: operation });
const generator = cloneableGenerator(func)({ payload: 'abc' }, 0);

describe('Report requests saga', () => {
   it('tries to request', () => {
      const gen = generator.clone();
      expect(
         gen.next().value
      ).toEqual(
         call(operation, 'abc')
      )
   })
});
