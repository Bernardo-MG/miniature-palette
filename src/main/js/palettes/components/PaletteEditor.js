import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PaletteEditorList from 'palettes/components/PaletteEditorList';
import PaintInput from 'palettes/components/PaintInput';

import { selectSuggestions, selectLoaded } from 'products/selectors';

import { read, setLoaded } from 'products/actions';

function useSuggestions() {
   const suggestions = useSelector(selectSuggestions);
   const loaded = useSelector(selectLoaded);

   const dispatch = useDispatch();
   const load = () => dispatch(read());
   const setLoad = (input) => dispatch(setLoaded(input));

   useEffect(() => {
      if (!loaded) {
         setLoad(true);
         load();
      }
   });

   return suggestions;
}

function PaletteEditor({ palette, addPalette }) {

   const suggestions = useSuggestions();

   return <Card>
      <CardContent>
         <PaintInput palette={palette} addPalette={addPalette} suggestions={suggestions} />
         <PaletteEditorList palette={palette} addPalette={addPalette}/>
      </CardContent>
   </Card>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteEditor;
