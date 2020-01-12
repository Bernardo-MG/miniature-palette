import { requestFailureSagas } from 'api/sagas/failure';

import api from 'api';

import { async } from 'api/sagas/async';

export const apiSagas = [
   ...requestFailureSagas,
   ...async('PALETTE', api.Palettes),
   ...async('PALETTE_GROUP', api.PaletteGroups)
];
