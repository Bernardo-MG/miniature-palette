import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function SchemeList({ data }) {
   const paletteData = <List>
      {data.map((palette) =>
         <ListItem button key={palette.name}>
            <ListItemText primary={palette.name}/>
         </ListItem>
      )}
   </List>;

   return <Grid container spacing={3}>
      <Grid item xs={12}>
         { paletteData }
      </Grid>
   </Grid>;
}

SchemeList.propTypes = {
   data: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired
      })
   ).isRequired,
   onSave: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   onReport: PropTypes.func
};

export default SchemeList;
