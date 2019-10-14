import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { selectPaletteOptions } from 'palettes/selectors';

import { readPalettes } from 'palettes/actions';

function PaletteGroupList({ load, palettes }) {

   useEffect(() => {
      load();
   });

   return <List>
      {palettes.map((palette) =>
         <ListItem key={palette.name}>
            <ListItemText primary={palette.name}/>
         </ListItem>,
      )}
   </List>;
}

PaletteGroupList.propTypes = {
   load: PropTypes.func.isRequired,
   palettes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
   return {
      palettes: selectPaletteOptions(state)
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      load: bindActionCreators(readPalettes, dispatch)
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PaletteGroupList);
