import React from 'react';

import PropTypes from 'prop-types';

import sideLinks from 'layout/links';

import { title } from 'config/app';

import SideMenuLayout from 'layout/components/SideMenuLayout';

/**
 * Base layout for the application. This will frame all the views.
 * 
 * It contains a navigation bar on the left side, and the view on the rest of the screen.
 */
function DefaultSideMenuLayout({ children }) {
   return <SideMenuLayout links={ sideLinks } title={ title }>{ children }</SideMenuLayout>;
}

DefaultSideMenuLayout.propTypes = {
   /** Children elements, the view contents */
   children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
   ])
};

export default DefaultSideMenuLayout;
