import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import Palette from 'palettes/components/Palette';

function PaletteGroupData({ group }) {
   return <React.Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <TextField value={group.name} />
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {group.palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <Palette palette={palette} />
            </Grid>;
         }
         )}
      </Grid>
   </React.Fragment>;
}

PaletteGroupData.propTypes = {
   group: PropTypes.shape({
      name: PropTypes.string,
      palettes: PropTypes.array
   })
};

export default PaletteGroupData;
