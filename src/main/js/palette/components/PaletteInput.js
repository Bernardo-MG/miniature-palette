import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Palette from 'palette/components/Palette';
import SuggestionInput from 'common/components/SuggestionInput';

import { selectSuggestions, selectLoaded } from 'products/selectors';

import { read, setLoaded } from 'products/actions';

function PaletteInput({ suggestions, palette, addPalette, load, setLoad, loaded }) {

   const [color, setColor] = useState('');

   function addColorToCurrent() {
      const newPalette = { ...palette };
      newPalette.paints = [...newPalette.paints, { name: color }];

      addPalette(newPalette);
   }

   useEffect(() => {
      if (!loaded) {
         setLoad(true);
         load();
      }
   });

   return <React.Fragment>
      <SuggestionInput
         suggestions={suggestions}
         label={'paint'}
         placeholder={'write_paint'}
         onChange={setColor}
         onPressEnter={addColorToCurrent}
      />
      <Palette palette={palette} addPalette={addPalette}/>
   </React.Fragment>;
}

PaletteInput.propTypes = {
   palette: PropTypes.object.isRequired,
   addPalette: PropTypes.func.isRequired,
   load: PropTypes.func.isRequired,
   setLoad: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired,
   loaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
   return {
      suggestions: selectSuggestions(state),
      loaded: selectLoaded(state)
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      load: bindActionCreators(read, dispatch),
      setLoad: bindActionCreators(setLoaded, dispatch)
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PaletteInput);
