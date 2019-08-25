import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';

function Palette() {

   const [palettes, setPalettes] = useState([]);

   const [color, setColor] = useState('');

   function addPalette() {
      setPalettes(['palette']);
   }

   return <React.Fragment>
      <div>
         <PaintSuggestionInput
            onChoose={setColor} />
         <Button onClick={addPalette}>
            { 'add' }
         </Button>
      </div>
      {palettes.map((palette) =>
         <Table key={palette}>
            <TableHead>
               <TableRow>
                  <TableCell component="th">title</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               <TableRow>
                  <TableCell scope="row">
                     {color}
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      )}
   </React.Fragment>;
}

Palette.propTypes = {};

export default Palette;
