import { requestFailureSagas } from 'api/sagas/failure';
import { paletteGroupApiSagas } from 'api/sagas/paletteGroup';

import api from 'api';

import { async } from 'api/sagas/async';

export const apiSagas = [
   ...requestFailureSagas,
   ...async('PALETTE', api.Palettes),
   ...paletteGroupApiSagas
];
