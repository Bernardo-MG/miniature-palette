import { paletteNotificationSagas } from 'notifications/sagas/palette';
import { paletteGroupNotificationSagas } from 'notifications/sagas/paletteGroup';

export const notificationSagas = [
   ...paletteNotificationSagas,
   ...paletteGroupNotificationSagas
];
