import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AddBoxIcon from '@material-ui/icons/AddBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import SuggestionInput from 'common/components/SuggestionInput';

function PaintInput({ onChange, suggestions, value }) {
   return <SuggestionInput
      suggestions={suggestions}
      label={'paint'}
      placeholder={'write_paint'}
      onChange={onChange}
      initial={value}
   />;
}

PaintInput.propTypes = {
   onChange: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired,
   value: PropTypes.string.isRequired
};

function PaletteEditorList({ palette, suggestions, onColorChange, onColorDelete }) {
   return <List>
      {palette.paints.map((color, index) =>
         <ListItem key={color.name + index}>
            <ListItemText>
               <PaintInput onChange={(value) => onColorChange(index, value)} suggestions={suggestions} value={color.name} />
            </ListItemText>
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => onColorDelete(index)}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </ListItem>
      )}
   </List>;
}

PaletteEditorList.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired
   }).isRequired,
   suggestions: PropTypes.array.isRequired,
   onColorChange: PropTypes.func.isRequired,
   onColorDelete: PropTypes.func.isRequired
};

function PaletteEditor({ palette, name, onChange, suggestions, onAdd, onDelete, onAddColor, onColorChange, onColorDelete }) {
   return <Card>
      <CardHeader
         title={
            <TextField name="name" label="palette_name" value={name} onChange={onChange} />
         }
         action={
            <Fragment>
               <IconButton aria-label="add" onClick={onAdd}>
                  <AddBoxIcon />
               </IconButton>
               <IconButton aria-label="delete" onClick={onDelete}>
                  <DeleteIcon />
               </IconButton>
            </Fragment>
         }
      />
      <CardContent>
         <PaletteEditorList palette={palette} suggestions={suggestions}
            onColorChange={onColorChange}
            onColorDelete={onColorDelete} />
      </CardContent>
      <CardActions>
         <IconButton aria-label="add" onClick={onAddColor}>
            <AddCircleIcon />
         </IconButton>
      </CardActions>
   </Card>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      name: PropTypes.string.isRequired,
      paints: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired
   }).isRequired,
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired,
   onAdd: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   onAddColor: PropTypes.func.isRequired,
   onColorChange: PropTypes.func.isRequired,
   onColorDelete: PropTypes.func.isRequired
};

export default PaletteEditor;
