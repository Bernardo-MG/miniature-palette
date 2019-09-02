import React from 'react';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Palette({ palette, addPalette }) {

   function deleteColor(color) {
      const newPalette = { ...palette };
      newPalette.colors = newPalette.colors.filter((item) => item !== color);

      addPalette(newPalette);
   }

   return <Table>
      <TableHead>
         <TableRow>
            <TableCell component="th">paint</TableCell>
            <TableCell component="th"></TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
         {palette.colors.map((color) =>
            <TableRow key={color}>
               <TableCell scope="row">
                  {color}
               </TableCell>
               <TableCell scope="row">
                  <IconButton onClick={() => deleteColor(color)}>
                     <HighlightOffIcon />
                  </IconButton>
               </TableCell>
            </TableRow>
         )}
      </TableBody>
   </Table>;
}

Palette.propTypes = {
   palette: PropTypes.array.isRequired,
   onDelete: PropTypes.func.isRequired,
   addPalette: PropTypes.func.isRequired
};

export default Palette;
