import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalettes } from 'palettes/actions';

import PaletteGroupForm from 'palettes/components/PaletteGroupForm';

function PaletteGroupEditor() {

   const suggestions = useSuggestions();

   const [palettes, setPalettes] = useState([]);

   const dispatch = useDispatch();

   function handleSave(form) {
      dispatch(savePalettes({ name: form.name, palettes }));
   }

   function updatePalettes(func) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));

      func(newPalettes);

      setPalettes(newPalettes);
   }

   function handleAddColor(i) {
      updatePalettes((newPalettes) => {
         newPalettes[i].paints.push({ name: '' });
      });
   }

   function handleColorChangeAt(i, index, color) {
      palettes[i].paints[index].name = color;
   }

   function handleColorDeleteAt(i, index) {
      updatePalettes((newPalettes) => {
         newPalettes[i].paints.splice(index, 1);
      });
   }

   return <PaletteGroupForm
      palettes={palettes}
      suggestions={suggestions}
      onSave={handleSave}
      onAddColor={handleAddColor}
      onDeleteColor={handleColorDeleteAt}
      onChangeColor={handleColorChangeAt}/>;
}

PaletteGroupEditor.propTypes = {};

export default PaletteGroupEditor;
