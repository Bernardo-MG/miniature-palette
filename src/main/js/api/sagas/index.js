import { requestFailureSagas } from 'api/sagas/failure';
import { paletteApiSagas } from 'api/sagas/palette';

export const apiSagas = [
   ...requestFailureSagas,
   ...paletteApiSagas
];
