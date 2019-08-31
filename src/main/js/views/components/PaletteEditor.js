import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';

function PaletteEditor() {

   const [palettes, setPalettes] = useState([]);

   const [color, setColor] = useState('');

   function addPalette() {
      setPalettes([color, ...palettes]);
   }

   return <React.Fragment>
      <div>
         <PaintSuggestionInput
            onChoose={setColor} />
         <Button onClick={addPalette}>
            { 'add' }
         </Button>
      </div>
      <Table>
         <TableHead>
            <TableRow>
               <TableCell component="th">paint</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {palettes.map((palette) =>
               <TableRow key={palette}>
                  <TableCell scope="row">
                     {palette}
                  </TableCell>
               </TableRow>
            )}
         </TableBody>
      </Table>
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
