import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';

function PaletteData({ data, onReturn, onEdit }) {
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
            <CardContent>
               <List>
                  {data.paints.map((paint) =>
                     <ListItem key={paint.name}>
                        <ListItemText primary={paint.name} secondary={paint.code} />
                     </ListItem>
                  )}
               </List>
            </CardContent>
         </Card>
      </Grid>
   </Fragment>;
}

PaletteData.propTypes = {
   data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      paints: PropTypes.array
   }).isRequired,
   onReturn: PropTypes.func.isRequired,
   onEdit: PropTypes.func.isRequired
};

function PaletteList({ data, onEdit }) {
   const [selected, setSelected] = useState(null);
   let paletteData;

   if (selected) {
      // Selected group
      paletteData = <Fragment>
         <PaletteData data={selected} onReturn={() => setSelected(null)} onEdit={onEdit} />
      </Fragment>;
   } else {
      // List of groups
      paletteData = <List>
         {data.map((palette) =>
            <ListItem button key={palette.name} onClick={() => setSelected(palette)}>
               <ListItemText primary={palette.name}/>
            </ListItem>
         )}
      </List>;
   }

   return <Fragment>
      <Grid container spacing={3}>
         { paletteData }
      </Grid>
   </Fragment>;
}

PaletteList.propTypes = {
   data: PropTypes.array.isRequired,
   onEdit: PropTypes.func.isRequired
};

export default PaletteList;