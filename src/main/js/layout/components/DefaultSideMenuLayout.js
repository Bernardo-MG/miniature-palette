import React from 'react';

import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';

import sideLinks from 'layout/links';

import SideMenuLayout from 'layout/components/SideMenuLayout';

/**
 * Base layout for the application. This will frame all the views.
 * 
 * It contains a navigation bar on the left side, and the view on the rest of the screen.
 */
function DefaultSideMenuLayout({ children, intl }) {
   return <SideMenuLayout links={ sideLinks } title={ intl.formatMessage({ id: 'app.name' }) }>{ children }</SideMenuLayout>;
}

DefaultSideMenuLayout.propTypes = {
   /** Children elements, the view contents */
   children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
   ]),
   intl: intlShape.isRequired
};

export default injectIntl(DefaultSideMenuLayout);
