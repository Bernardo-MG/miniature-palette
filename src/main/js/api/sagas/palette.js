import api from 'api';

import { async } from 'api/sagas/async';

export const paletteApiSagas = async('PALETTE', api.Palettes);
