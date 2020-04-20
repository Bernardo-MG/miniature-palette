import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

function SchemeData({ data }) {
   return <Grid container spacing={3}>
      <Grid item xs={12}>
         <Typography variant="h1" component="h2">
            { data.name }
         </Typography>
      </Grid>
      <Grid item xs={12}>
         <List>
            {data.palettes.map((palette) =>
               <ListItem button key={palette.name}>
                  <ListItemText primary={palette.name}/>
               </ListItem>
            )}
         </List>
      </Grid>
   </Grid>;
}

SchemeData.propTypes = {
   data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      palettes: PropTypes.arrayOf(PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired
      })).isRequired
   }).isRequired
};

function SchemeList({ data }) {
   const [selected, setSelected] = useState(undefined);

   let component;

   if (selected) {
      component = <SchemeData data={selected} />;
   } else {
      component = <List>
         {data.map((palette) =>
            <ListItem button key={palette.name} onClick={() => setSelected(palette)}>
               <ListItemText primary={palette.name} />
            </ListItem>
         )}
      </List>;
   }

   return <Grid container spacing={3}>
      <Grid item xs={12}>
         { component }
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
