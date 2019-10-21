import React from 'react';

import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function PaletteData({ palette }) {
   return <List>
      {palette.paints.map((color) =>
         <ListItem key={color.name}>
            <ListItemText primary={color.name} secondary={color.code} />
         </ListItem>
      )}
   </List>;
}

PaletteData.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired
};

export default PaletteData;
