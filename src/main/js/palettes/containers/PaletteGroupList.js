import React, { useState } from 'react';

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

   return <List>
      {palettes.map((palette) =>
         <ListItem button key={palette.name} onClick={() => setSelected(palette)}>
            <ListItemText primary={palette.name}/>
         </ListItem>
      )}
      {paletteData}
   </List>;
}

PaletteGroupList.propTypes = {};

export default PaletteGroupList;
