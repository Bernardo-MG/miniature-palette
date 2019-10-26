import React, { Fragment, useState } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PaletteGroupData from 'palettes/components/PaletteGroupData';

import { usePalettes } from 'palettes';

function PaletteGroupList() {
   const [selected, setSelected] = useState(null);
   const palettes = usePalettes();

   let paletteData;

   if (selected) {
      paletteData = <PaletteGroupData key={selected.name} group={selected} />;
   }

   return <Fragment>
      <Grid container spacing={3}>
         <List>
            {palettes.map((palette) =>
               <ListItem button key={palette.name} onClick={() => setSelected(palette)}>
                  <ListItemText primary={palette.name}/>
               </ListItem>
            )}
         </List>
      </Grid>
      <Grid container spacing={3}>
         <Card>
            {paletteData}
         </Card>
      </Grid>
   </Fragment>;
}

PaletteGroupList.propTypes = {};

export default PaletteGroupList;
