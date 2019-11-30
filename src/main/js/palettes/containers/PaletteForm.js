import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalette } from 'palettes/actions';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteForm() {

   const suggestions = useSuggestions();

   const [palette, setPalette] = useState({ name: '', paints: [] });

   const dispatch = useDispatch();

   function handleSave(form) {
      dispatch(savePalette({ name: form.name, palette }));
   }

   function handleAddColor() {
      const newPalette = JSON.parse(JSON.stringify(palette));

      newPalette.paints.push({ name: '' });

      setPalette(newPalette);
   }

   function handleColorChange(index, color) {
      palette.paints[index].name = color;
   }

   function handleColorDelete(index) {
      const newPalette = JSON.parse(JSON.stringify(palette));

      newPalette.paints.splice(index, 1);

      setPalette(newPalette);
   }

   return <PaletteEditor
      palette={palette}
      suggestions={suggestions}
      onSave={handleSave}
      onAddColor={handleAddColor}
      onColorChange={handleColorChange}
      onColorDelete={handleColorDelete} />;
}

PaletteForm.propTypes = {};

export default PaletteForm;
