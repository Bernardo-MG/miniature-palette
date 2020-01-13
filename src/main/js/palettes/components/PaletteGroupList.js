import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PaletteEditor from 'palettes/components/PaletteEditor';
import PaletteGroupData from 'palettes/components/PaletteGroupData';

function PaletteGroupList({ data, onSave, onDelete }) {
   const [selected, setSelected] = useState(null);
   const [editing, setEditing] = useState(null);
   let groupData;

   if (editing) {
      // Selected group
      groupData = <Fragment>
         <PaletteEditor
            onSave={onSave}
            onDelete={onDelete}
            onReturn={() => setEditing(null)}
            initialValues={editing} />;
      </Fragment>;
   } else if (selected) {
      // Selected group
      groupData = <Fragment>
         <PaletteGroupData data={selected} onReturn={() => setSelected(null)} onEdit={setEditing} />
      </Fragment>;
   } else {
      // List of groups
      groupData = <List>
         {data.map((group) =>
            <ListItem button key={group.name} onClick={() => setSelected(group)}>
               <ListItemText primary={group.name}/>
            </ListItem>
         )}
      </List>;
   }

   return <Fragment>
      <Grid container spacing={3}>
         { groupData }
      </Grid>
   </Fragment>;
}

PaletteGroupList.propTypes = {
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
   onEdit: PropTypes.func.isRequired,
   onSave: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired
};

export default PaletteGroupList;
