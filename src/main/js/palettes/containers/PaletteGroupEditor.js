import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalette } from 'palettes/actions';

import PaletteGroupForm from 'palettes/components/PaletteGroupForm';

import api from 'api';

function PaletteGroupEditor({ id }) {

   const palette = api.PaletteGroups.byId(id);

   const suggestions = useSuggestions();

   const [palettes, setPalettes] = useState([]);

   const dispatch = useDispatch();

   function handleSave(form) {
      dispatch(savePalette({ name: form.name, palettes }));
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
      palette={palette}
      palettes={palettes}
      suggestions={suggestions}
      onSave={handleSave}
      onAddColor={handleAddColor}
      onDeleteColor={handleColorDeleteAt}
      onChangeColor={handleColorChangeAt}/>;
}

PaletteGroupEditor.propTypes = {
   id: PropTypes.number.isRequired
};

export default PaletteGroupEditor;
