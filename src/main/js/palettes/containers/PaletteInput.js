import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

import { selectSuggestions, selectLoaded } from 'products/selectors';

import { read, setLoaded } from 'products/actions';

function PaletteInput({ palette, addPalette }) {

   const suggestions = useSelector(selectSuggestions);
   const loaded = useSelector(selectLoaded);

   const dispatch = useDispatch();
   const load = () => dispatch(read());
   const setLoad = (input) => dispatch(setLoaded(input));

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

   return <SuggestionInput
      suggestions={suggestions}
      label={'paint'}
      placeholder={'write_paint'}
      onChange={setColor}
      onPressEnter={addColorToCurrent}
   />;
}

PaletteInput.propTypes = {
   palette: PropTypes.object.isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteInput;
