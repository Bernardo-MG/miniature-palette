import { requestFailureSagas } from 'api/sagas/failure';

import { Palettes } from 'api/requests';

import { crud } from 'api/sagas/crud';
import { report } from 'api/sagas/report';

export const apiSagas = [
   ...requestFailureSagas,
   ...crud('PALETTE', Palettes),
   ...report('PALETTE', Palettes)
];
