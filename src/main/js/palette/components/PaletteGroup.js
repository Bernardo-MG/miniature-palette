import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import PaletteInput from 'palette/components/PaletteInput';

import api from 'api';

import { read } from 'products/actions';

import { selectSuggestions } from 'products/selectors';

function AddButton({ onClick }) {
   return <IconButton onClick={onClick}>
      <NoteAddIcon />
   </IconButton>;
}

AddButton.propTypes = {
   onClick: PropTypes.func.isRequired
};

function SaveButton({ onClick }) {
   return <IconButton onClick={onClick}>
      <SaveIcon />
   </IconButton>;
}

SaveButton.propTypes = {
   onClick: PropTypes.func.isRequired
};

function PaletteGroup({ load, suggestions }) {

   const [loaded, setLoaded] = useState(false);
   const [name, setName] = useState('palettes');
   const [palettes, setPalettes] = useState([]);
   const [paletteIndex, setPaletteIndex] = useState(0);

   function createPalette() {
      const newPalette = { name: `palette${paletteIndex}`, paints: [] };
      setPalettes([...palettes, newPalette]);
      setPaletteIndex(paletteIndex + 1);
   }

   function addPalette(palette) {
      let index;
      palettes.find((pal, i) => {
         index = i;
         return pal.name === palette.name;
      });
      const newPalettes = [...palettes];
      newPalettes[index] = palette;

      setPalettes(newPalettes);
   }

   function handleNameChange(event) {
      setName(event.target.value);
   }

   function savePalette() {
      api.Palettes.save({ name, palettes });
   }

   useEffect(() => {
      if (!loaded) {
         load();
         setLoaded(true);
      }
   });

   return <React.Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <TextField value={name} onChange={handleNameChange} />
         </Grid>
         <Grid item xs={6}>
            <SaveButton onClick={savePalette} />
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <PaletteInput suggestions={suggestions} palette={palette} addPalette={addPalette} />
            </Grid>;
         }
         )}
         <Grid item xs={6}>
            <AddButton onClick={createPalette} />
         </Grid>
      </Grid>
   </React.Fragment>;
}

PaletteGroup.propTypes = {
   load: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
   return {
      suggestions: selectSuggestions(state)
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      load: bindActionCreators(read, dispatch)
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PaletteGroup);
