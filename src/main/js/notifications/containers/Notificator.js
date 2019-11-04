import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { SnackbarProvider } from 'notistack';

import { selectNotifications } from 'notifications/selectors';

import api from 'api';

import PaletteGroupForm from 'palettes/components/PaletteGroupForm';

function Notificator({ children }) {

   const [displayed, setDisplayed] = useState([]);
   const { enqueueSnackbar } = useSnackbar();

   const notifications = useSelector(selectNotifications);

   storeDisplayed = (id) => {
      setDisplayed([...displayed, id]);
   };

   removeDisplayed = (id) => {
      setDisplayed(displayed.filter(key => id !== key));
   }

   notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
          this.props.closeSnackbar(key)
          return
      }
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, key) => {
              if (options.onClose) {
                  options.onClose(event, reason, key);
              }
          },
          onExited: (event, key) => {
              this.props.removeSnackbar(key);
              this.removeDisplayed(key)
          }
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
   });

   return <SnackbarProvider>{children}</SnackbarProvider>;
}

Notificator.propTypes = {};

export default Notificator;
