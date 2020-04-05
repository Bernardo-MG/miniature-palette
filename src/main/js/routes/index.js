import React from 'react';
import { Switch } from 'react-router-dom';

import SideMenuLayoutRoute from 'routes/SideMenuLayoutRoute';

import { Index, PaletteCreationView, PaletteListView, SchemeCreationView, SchemeListView } from 'views';

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
   <SideMenuLayoutRoute path='/palette/view' exact component={PaletteListView}/>
   <SideMenuLayoutRoute path='/scheme/create' exact component={SchemeCreationView}/>
   <SideMenuLayoutRoute path='/scheme/view' exact component={SchemeListView}/>
</Switch>;
