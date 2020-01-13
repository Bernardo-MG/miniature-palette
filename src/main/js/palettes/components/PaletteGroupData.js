import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
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

export default PaletteGroupData;
