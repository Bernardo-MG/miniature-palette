import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import PaletteData from 'palettes/components/PaletteData';

function PaletteGroupData({ group }) {
   return <Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <Typography>{group.name}</Typography>
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {group.palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <Typography>{palette.name}</Typography>
               <PaletteData palette={palette} />
            </Grid>;
         }
         )}
      </Grid>
   </Fragment>;
}

PaletteGroupData.propTypes = {
   group: PropTypes.shape({
      name: PropTypes.string,
      palettes: PropTypes.array
   })
};

export default PaletteGroupData;
