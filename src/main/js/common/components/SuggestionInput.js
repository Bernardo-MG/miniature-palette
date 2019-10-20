import React, { useState } from 'react';

import PropTypes from 'prop-types';

import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

export default function SuggestionInput({ id, label, placeholder, suggestions, onChange }) {

   const [anchorEl, setAnchorEl] = useState(null);
   const [text, setText] = useState('');
   const [stateSuggestions, setSuggestions] = React.useState([]);

   const useStyles = makeStyles((theme) => ({
      root: {
         height: 250,
         flexGrow: 1
      },
      container: {
         position: 'relative'
      },
      suggestionsContainerOpen: {
         position: 'absolute',
         zIndex: 1,
         marginTop: theme.spacing(1),
         left: 0,
         right: 0
      },
      suggestion: {
         display: 'block'
      },
      suggestionsList: {
         margin: 0,
         padding: 0,
         listStyleType: 'none'
      },
      divider: {
         height: theme.spacing(2)
      }
   }));

   function renderInputComponent(inputProps) {
      const { inputRef = () => {}, ref, ...other } = inputProps;

      return (
         <TextField
            fullWidth
            InputProps={{
               inputRef: (node) => {
                  ref(node);
                  inputRef(node);
               }
            }}
            {...other}
         />
      );
   }

   function renderSuggestion(suggestion, { query, isHighlighted }) {
      const matches = match(suggestion, query);
      const parts = parse(suggestion, matches);

      return (
         <MenuItem selected={isHighlighted} component="div">
            <div>
               {parts.map((part) => (
                  <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                     {part.text}
                  </span>
               ))}
            </div>
         </MenuItem>
      );
   }

   function getSuggestions(value) {
      const inputValue = deburr(value.trim()).toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;
      let result;

      if (inputLength === 0) {
         result = [];
      } else {
         result = suggestions.filter((suggestion) => {
            const keep = count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
               count += 1;
            }

            return keep;
         });
      }

      return result;
   }

   function getSuggestionValue(suggestion) {
      return suggestion;
   }

   const handleSuggestionsFetchRequested = ({ value }) => {
      setSuggestions(getSuggestions(value));
   };

   const handleSuggestionsClearRequested = () => {
      setSuggestions([]);
   };

   const handleChange = (event, { newValue }) => {
      setText(newValue);
      onChange(newValue);
   };

   const classes = useStyles();

   const autosuggestProps = {
      renderInputComponent,
      suggestions: stateSuggestions,
      onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
   };

   return (
      <Autosuggest
         {...autosuggestProps}
         inputProps={{
            id,
            label,
            placeholder,
            value: text,
            onChange: handleChange,
            inputRef: (node) => {
               setAnchorEl(node);
            }
         }}
         theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
         }}
         renderSuggestionsContainer={(options) => (
            <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
               <Paper
                  square
                  {...options.containerProps}
                  style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
               >
                  {options.children}
               </Paper>
            </Popper>
         )}
      />
   );
}

SuggestionInput.propTypes = {
   id: PropTypes.string,
   label: PropTypes.string.isRequired,
   placeholder: PropTypes.string.isRequired,
   suggestions: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired
};
