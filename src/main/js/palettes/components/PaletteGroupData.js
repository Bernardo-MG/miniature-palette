import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';

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

function PaletteGroupData({ group }) {
   return <Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <Typography>{group.name}</Typography>
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {group.palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <Typography>{palette.name}</Typography>
               <PaletteData palette={palette} />
            </Grid>;
         }
         )}
      </Grid>
   </Fragment>;
}

PaletteGroupData.propTypes = {
   group: PropTypes.shape({
      name: PropTypes.string,
      palettes: PropTypes.array
   })
};

export default PaletteGroupData;
