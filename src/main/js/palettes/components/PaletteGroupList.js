import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

function PaletteGroupData({ group }) {
   return <Fragment>
      <Grid item xs={8}>
         <Card>
            <CardHeader title={ <Typography>{group.name}</Typography> } />
         </Card>
      </Grid>
      {group.palettes.map((palette, index) => {
         return <Grid item xs={8} key={palette.name + index}>
            <Card>
               <CardHeader title={ <Typography>{palette.name}</Typography> } />
               <CardContent>
                  <List>
                     {palette.paints.map((color) =>
                        <ListItem key={color.name}>
                           <ListItemText primary={color.name} secondary={color.code} />
                        </ListItem>
                     )}
                  </List>
               </CardContent>
            </Card>
         </Grid>;
      }
      )}
   </Fragment>;
}

PaletteGroupData.propTypes = {
   group: PropTypes.shape({
      name: PropTypes.string,
      palettes: PropTypes.array
   })
};

function PaletteGroupList({ groups }) {
   const [selected, setSelected] = useState(null);
   let paletteData;

   if (selected) {
      paletteData = <PaletteGroupData group={selected} />;
   } else {
      paletteData = null;
   }

   return <Fragment>
      { /* List of groups */ }
      <Grid container spacing={3}>
         <List>
            {groups.map((palette) =>
               <ListItem button key={palette.name} onClick={() => setSelected(palette)}>
                  <ListItemText primary={palette.name}/>
               </ListItem>
            )}
         </List>
      </Grid>
      { /* Selected group */ }
      <Grid container spacing={3}>
         { paletteData }
      </Grid>
   </Fragment>;
}

PaletteGroupList.propTypes = {
   groups: PropTypes.array.isRequired
};

export default PaletteGroupList;
