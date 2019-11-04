import { useSelector, useState } from 'react';

import { useDispatch } from 'react-redux';

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

   notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
         closeSnackbar(key);
         return;
      }
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return;
      // Display snackbar using notistack
      enqueueSnackbar(message, {
         key,
         ...options,
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

   return children;
}

Notificator.propTypes = {
   children: PropTypes.array,
   enqueueSnackbar: PropTypes.func,
   closeSnackbar: PropTypes.func
};

export default withSnackbar(Notificator);
