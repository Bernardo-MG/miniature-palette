import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Palette() {

   const [palettes, setPalettes] = useState([]);

   function addPalette() {
      setPalettes(['palette']);
   }

   return <React.Fragment>
      <Button onClick={addPalette}>
         { 'add' }
      </Button>
      {palettes.map((palette) =>
         <Table key={palette}>
            <TableHead>
               <TableRow>
                  <TableCell>title</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               <TableRow>
                  <TableCell component="th" scope="row">
                     {palette}
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      )}
   </React.Fragment>;
}

Palette.propTypes = {};

export default Palette;
