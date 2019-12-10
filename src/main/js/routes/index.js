import React from 'react';
import { Switch } from 'react-router-dom';

import SideMenuLayoutRoute from 'routes/SideMenuLayoutRoute';

import { Index, PaletteCreationView, PaletteEditionView, PaletteListView } from 'views';

/**
 * All the routes for the application.
 * 
 * These are composed of three parts:
 * - Path
 * - Class name to mark links as active
 * - Component to show
 */
export default <Switch>
   <SideMenuLayoutRoute path='/' exact component={Index}/>
   <SideMenuLayoutRoute path='/palette/create' exact component={PaletteCreationView}/>
   <SideMenuLayoutRoute path='/palette/edit/:id' exact component={PaletteEditionView}/>
   <SideMenuLayoutRoute path='/palette/view' exact component={PaletteListView}/>
</Switch>;
