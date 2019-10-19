import React from 'react';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function PaletteData({ palette }) {

   return <Table>
      <TableHead>
         <TableRow>
            <TableCell component="th">paint</TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
         {palette.paints.map((color) =>
            <TableRow key={color.name}>
               <TableCell scope="row">
                  {color.name}
               </TableCell>
            </TableRow>
         )}
      </TableBody>
   </Table>;
}

PaletteData.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired
};

export default PaletteData;
