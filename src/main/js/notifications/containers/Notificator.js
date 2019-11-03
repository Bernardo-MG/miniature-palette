import React from 'react';

import { useSnackbar } from 'notistack';

import { SnackbarProvider } from 'notistack';

import { selectNotifications } from 'notifications/selectors';

import api from 'api';

import PaletteGroupForm from 'palettes/components/PaletteGroupForm';

function Notificator({ children }) {

   const { enqueueSnackbar } = useSnackbar();

   const notifications = useSelector(selectNotifications);

   function clean() {
      setName('');
      setPalettes([]);
   }

   function handleSave() {
      api.Palettes.save({ name, palettes });
      enqueueSnackbar('saved_message', { variant: 'success' });
      clean();
   }

   return <SnackbarProvider>{children}</SnackbarProvider>;
}

Notificator.propTypes = {};

export default Notificator;
