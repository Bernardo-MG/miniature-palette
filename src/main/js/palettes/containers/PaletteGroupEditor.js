import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { notifySuccess } from 'notifications/actions';

import api from 'api';

import PaletteGroupForm from 'palettes/components/PaletteGroupForm';

function PaletteGroupEditor() {

   const suggestions = useSuggestions();

   const [name, setName] = useState('');
   const [palettes, setPalettes] = useState([]);

   const dispatch = useDispatch();

   function clean() {
      setName('');
      setPalettes([]);
   }

   function handleSave() {
      api.Palettes.save({ name, palettes });
      clean();
      dispatch(notifySuccess(new Date().getTime() + Math.random(), 'saved_message'));
   }

   function handleNameChange(value) {
      setName(value);
   }

   function updatePalettes(func) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));

      func(newPalettes);

      setPalettes(newPalettes);
   }

   function handleAddPalette() {
      updatePalettes((newPalettes) => {
         const newPalette = { name: '', paints: [] };
         newPalettes.push(newPalette);
      });
   }

   function handleDeletePalette(index) {
      updatePalettes((newPalettes) => {
         newPalettes.splice(index, 1);
      });
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

   function handlePaletteNameChange(i, value) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));

      newPalettes[i].name = value;

      setPalettes(newPalettes);
   }

   return <PaletteGroupForm
      name={name}
      palettes={palettes}
      suggestions={suggestions}
      onSave={handleSave}
      onNameChange={handleNameChange}
      onPaletteNameChange={handlePaletteNameChange}
      onAddPalette={handleAddPalette}
      onDeletePalette={handleDeletePalette}
      onAddColor={handleAddColor}
      onDeleteColor={handleColorDeleteAt}
      onChangeColor={handleColorChangeAt}/>;
}

PaletteGroupEditor.propTypes = {};

export default PaletteGroupEditor;
