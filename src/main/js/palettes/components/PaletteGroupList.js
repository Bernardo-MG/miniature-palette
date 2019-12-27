import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';

function PaletteGroupData({ data, onReturn, onEdit }) {
   return <Fragment>
      <Grid item xs={8}>
         <Card>
            <CardHeader
               title={ <Typography>{data.name}</Typography> }
               action={
                  <Fragment>
                     <IconButton edge="end" aria-label="back" onClick={onReturn}>
                        <ArrowBackIcon />
                     </IconButton>
                     <IconButton aria-label="edit" onClick={() => onEdit(data.id)}>
                        <EditIcon />
                     </IconButton>
                  </Fragment>
               } />
         </Card>
      </Grid>
   </Fragment>;
}

PaletteGroupData.propTypes = {
   data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      paints: PropTypes.arrayOf(
         PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
         })
      ).isRequired
   }).isRequired,
   onReturn: PropTypes.func.isRequired,
   onEdit: PropTypes.func.isRequired
};

function PaletteGroupList({ data, onEdit }) {
   const [selected, setSelected] = useState(null);
   let groupData;

   if (selected) {
      // Selected group
      groupData = <Fragment>
         <PaletteGroupData data={selected} onReturn={() => setSelected(null)} onEdit={onEdit} />
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
   onEdit: PropTypes.func.isRequired
};

export default PaletteGroupList;
