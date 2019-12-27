import { requestFailureSagas } from 'api/sagas/failure';
import { paletteApiSagas } from 'api/sagas/palette';
import { paletteGroupApiSagas } from 'api/sagas/paletteGroup';

export const apiSagas = [
   ...requestFailureSagas,
   ...paletteApiSagas,
   ...paletteGroupApiSagas
];
