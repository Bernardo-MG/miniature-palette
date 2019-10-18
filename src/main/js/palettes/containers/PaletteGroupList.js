import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { selectPaletteOptions } from 'palettes/selectors';

import { readPalettes } from 'palettes/actions';

function PaletteGroupList() {

   const palettes = useSelector(selectPaletteOptions);

   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

   return <List>
      {palettes.map((palette) =>
         <ListItem key={palette.name}>
            <ListItemText primary={palette.name}/>
         </ListItem>,
      )}
   </List>;
}

PaletteGroupList.propTypes = {};

export default PaletteGroupList;
