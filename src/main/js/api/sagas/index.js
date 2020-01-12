import { requestFailureSagas } from 'api/sagas/failure';

import api from 'api';

import { crud } from 'api/sagas/crud';
import { report } from 'api/sagas/report';

export const apiSagas = [
   ...requestFailureSagas,
   ...crud('PALETTE', api.Palettes),
   ...report('PALETTE', api.Palettes),
   ...crud('PALETTE_GROUP', api.PaletteGroups)
];
