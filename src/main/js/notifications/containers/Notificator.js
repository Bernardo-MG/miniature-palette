import React, { Fragment, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { withSnackbar } from 'notistack';

import { selectNotifications } from 'notifications/selectors';

import { removeNotification } from 'notifications/actions';

import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

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

   function dismiss(key) {
      return <IconButton onClick={() => closeSnackbar(key)}><DeleteIcon /></IconButton>;
   }

   notifications.forEach(({ timestamp, message, variant }) => {
      const key = timestamp;

      if (displayed.includes(key)) {
         // Do nothing if snackbar is already displayed
      } else {
         // Display snackbar using notistack
         enqueueSnackbar(message, {
            key,
            variant,
            onExited: (event, k) => {
               dispatch(removeNotification(k));
               removeDisplayed(key);
            },
            action: dismiss
         });
         // Keep track of snackbars that we've displayed
         storeDisplayed(key);
      }
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
