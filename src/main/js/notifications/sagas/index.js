import { paletteNotificationSagas } from 'notifications/sagas/palette';
import { schemeNotificationSagas } from 'notifications/sagas/scheme';

export const notificationSagas = [
   ...paletteNotificationSagas,
   ...schemeNotificationSagas
];
