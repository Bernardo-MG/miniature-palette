import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PaletteEditor from 'palettes/components/PaletteEditor';
import PaletteData from 'palettes/components/PaletteData';

function PaletteList({ data, onSave, onDelete, onReport }) {
   const [selected, setSelected] = useState(null);
   const [editing, setEditing] = useState(null);
   let paletteData;

   if (editing) {
      // Edited palette
      paletteData = <PaletteEditor
         onSave={onSave}
         onDelete={onDelete}
         onReturn={() => setEditing(null)}
         initialValues={editing} />;
   } else if (selected) {
      // Selected palette
      paletteData = <PaletteData data={selected} onReturn={() => setSelected(null)} onEdit={() => setEditing(selected)} onReport={onReport} />;
   } else {
      // List of palettes
      paletteData = <List>
         {data.map((palette) =>
            <ListItem button key={palette.name} onClick={() => setSelected(palette)}>
               <ListItemText primary={palette.name}/>
            </ListItem>
         )}
      </List>;
   }

   return <Grid container spacing={3}>
      <Grid item xs={12}>
         { paletteData }
      </Grid>
   </Grid>;
}

PaletteList.propTypes = {
   data: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
         paints: PropTypes.arrayOf(
            PropTypes.shape({
               id: PropTypes.number.isRequired,
               name: PropTypes.string.isRequired
            })
         ).isRequired
      })
   ).isRequired,
   onSave: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   onReport: PropTypes.func
};

export default PaletteList;
