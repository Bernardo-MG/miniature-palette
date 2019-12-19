import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

function PaintSelector({ values, onSelect }) {
   return <Fragment>
      <Box>
         <TextField id="paint-code" label="paint_code" />
         <TextField id="paint-name" label="paint_name" />
      </Box>
      <List>
         {values.map((value) => (
            <ListItem button onClick={() => onSelect(value)} key={value.id}>
               <ListItemText primary={value} />
            </ListItem>
         ))}
      </List>
   </Fragment>;
}

PaintSelector.propTypes = {
   values: PropTypes.array.isRequired,
   onSelect: PropTypes.func.isRequired
};

export default PaintSelector;
