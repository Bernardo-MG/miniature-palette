import React from 'react';

import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import routes from 'routes';
import { BrowserRouter as Router } from 'react-router-dom';

import { IntlProvider } from 'react-intl';

import { SnackbarProvider } from 'notistack';

import Notificator from 'notify/containers/Notificator';

/**
 * Production root application.
 */
const Root = ({ store, language, i18nMessages }) => (
   <IntlProvider locale={language} defaultLocale='en' messages={i18nMessages}>
      <Provider store={store}>
         <SnackbarProvider>
            <Notificator>
               <Router>
                  {routes}
               </Router>
            </Notificator>
         </SnackbarProvider>
      </Provider>
   </IntlProvider>
);

Root.propTypes = {
   /** Application store */
   store: PropTypes.object.isRequired,
   /** Application language */
   language: PropTypes.string.isRequired,
   /** Internationalization messages */
   i18nMessages: PropTypes.object.isRequired
};

export default Root;
