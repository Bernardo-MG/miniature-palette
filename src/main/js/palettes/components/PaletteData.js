import React, { Fragment } from 'react';

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
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';

function PaletteData({ data, onReturn, onEdit, onReport }) {
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
                     <IconButton aria-label="report" onClick={() => onReport(data.id)}>
                        <DescriptionIcon />
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
      paints: PropTypes.arrayOf(
         PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
         })
      ).isRequired
   }).isRequired,
   onReturn: PropTypes.func.isRequired,
   onEdit: PropTypes.func.isRequired,
   onReport: PropTypes.func
};

export default PaletteData;
