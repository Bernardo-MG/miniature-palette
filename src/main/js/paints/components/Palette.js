import React from 'react';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Palette({ palette }) {
   return <Table>
      <TableHead>
         <TableRow>
            <TableCell component="th">paint</TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
         {palette.map((color) =>
            <TableRow key={color}>
               <TableCell scope="row">
                  {color}
               </TableCell>
            </TableRow>
         )}
      </TableBody>
   </Table>;
}

Palette.propTypes = {
   palette: PropTypes.array.isRequired
};

export default Palette;
