import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
   return <Card>
      <CardHeader
         title={
            <Typography>{group.name}</Typography>
         }
      />
      <Grid container spacing={3}>
         {group.palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <Typography>{palette.name}</Typography>
               <PaletteData palette={palette} />
            </Grid>;
         }
         )}
      </Grid>
   </Card>;
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
