import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PaletteGroupData from 'palettes/components/PaletteGroupData';

import { selectPaletteOptions } from 'palettes/selectors';

import { readPalettes } from 'palettes/actions';

function PaletteGroupList() {

   const [selected, setSelected] = useState(null);
   const palettes = useSelector(selectPaletteOptions);

   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

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
