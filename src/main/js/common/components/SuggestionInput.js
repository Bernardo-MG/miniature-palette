import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

const suggestions = [
   { label: 'Afghanistan' },
   { label: 'Aland Islands' },
   { label: 'Albania' },
   { label: 'Algeria' },
   { label: 'American Samoa' },
   { label: 'Andorra' },
   { label: 'Angola' },
   { label: 'Anguilla' },
   { label: 'Antarctica' },
   { label: 'Antigua and Barbuda' },
   { label: 'Argentina' },
   { label: 'Armenia' },
   { label: 'Aruba' },
   { label: 'Australia' },
   { label: 'Austria' },
   { label: 'Azerbaijan' },
   { label: 'Bahamas' },
   { label: 'Bahrain' },
   { label: 'Bangladesh' },
   { label: 'Barbados' },
   { label: 'Belarus' },
   { label: 'Belgium' },
   { label: 'Belize' },
   { label: 'Benin' },
   { label: 'Bermuda' },
   { label: 'Bhutan' },
   { label: 'Bolivia, Plurinational State of' },
   { label: 'Bonaire, Sint Eustatius and Saba' },
   { label: 'Bosnia and Herzegovina' },
   { label: 'Botswana' },
   { label: 'Bouvet Island' },
   { label: 'Brazil' },
   { label: 'British Indian Ocean Territory' },
   { label: 'Brunei Darussalam' }
];

export default function SuggestionInput() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [state, setState] = React.useState({
      single: '',
      popper: ''
   });

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
      const matches = match(suggestion.label, query);
      const parts = parse(suggestion.label, matches);

      return (
         <MenuItem selected={isHighlighted} component="div">
            <div>
               {parts.map((part) => (
                  <span key={part.text}>
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

      return inputLength === 0
         ? []
         : suggestions.filter((suggestion) => {
            const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
               count += 1;
            }

            return keep;
         });
   }

   function getSuggestionValue(suggestion) {
      return suggestion.label;
   }

   const [stateSuggestions, setSuggestions] = React.useState([]);

   const handleSuggestionsFetchRequested = ({ value }) => {
      setSuggestions(getSuggestions(value));
   };

   const handleSuggestionsClearRequested = () => {
      setSuggestions([]);
   };

   const handleChange = (name) => (event, { newValue }) => {
      setState({
         ...state,
         [name]: newValue
      });
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
      <div>
         <Autosuggest
            {...autosuggestProps}
            inputProps={{
               id: 'react-autosuggest-popper',
               label: 'Country',
               placeholder: 'With Popper',
               value: state.popper,
               onChange: handleChange('popper'),
               inputRef: (node) => {
                  setAnchorEl(node);
               },
               InputLabelProps: {
                  shrink: true
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
      </div>
   );
}
