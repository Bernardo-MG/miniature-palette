import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import api from 'api';

function PaletteGroupList() {

   const [palettes, setPalettes] = useState([]);

   useEffect(() => {
      setPalettes(api.Palettes.all());
   });

   return <List>
      {palettes.map((palette) =>
         <ListItem key={palette.name}>
            <ListItemText primary={palette.name}/>
         </ListItem>,
      )}
   </List>;
}

PaletteGroupList.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteGroupList;
