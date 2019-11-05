import React, { Fragment, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { withSnackbar } from 'notistack';

import { selectNotifications } from 'notifications/selectors';

import { removeNotification } from 'notifications/actions';

function Notificator({ children, enqueueSnackbar, closeSnackbar }) {

   const [displayed, setDisplayed] = useState([]);

   const notifications = useSelector(selectNotifications);

   const dispatch = useDispatch();

   function storeDisplayed(id) {
      setDisplayed([...displayed, id]);
   }

   function removeDisplayed(id) {
      setDisplayed(displayed.filter((key) => id !== key));
   }

   notifications.forEach(({ key, message, variant, options = {}, dismissed = false }) => {
      if (dismissed) {
         closeSnackbar(key);
         return;
      }
      // Do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;
      // Display snackbar using notistack
      enqueueSnackbar(message, {
         key,
         ...options,
         variant,
         onClose: (event, reason, k) => {
            if (options.onClose) {
               options.onClose(event, reason, k);
            }
         },
         onExited: (event, k) => {
            dispatch(removeNotification(k));
            removeDisplayed(key);
         }
      });
      // Keep track of snackbars that we've displayed
      storeDisplayed(key);
   });

   return <Fragment>{children}</Fragment>;
}

Notificator.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
   ]),
   enqueueSnackbar: PropTypes.func,
   closeSnackbar: PropTypes.func
};

export default withSnackbar(Notificator);
