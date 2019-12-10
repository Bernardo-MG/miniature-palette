import React from 'react';

import { useDispatch } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalette } from 'palettes/actions';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteForm() {

   const suggestions = useSuggestions();

   const dispatch = useDispatch();

   const values = {
      name: '',
      paints: []
   };

   function toPalette(v) {
      return { name: v.name.value };
   }

   function handleSave(form) {
      const palette = { ...form };

      palette.paints = palette.paints.map(toPalette);

      dispatch(savePalette(palette));
   }

   return <PaletteEditor
      suggestions={suggestions}
      onSave={handleSave}
      initialValues={values} />;
}

PaletteForm.propTypes = {};

export default PaletteForm;
