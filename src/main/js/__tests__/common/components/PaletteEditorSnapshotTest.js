import React from 'react'
import renderer from 'react-test-renderer';

import PaletteEditor from 'palettes/components/PaletteEditor';

describe('<SuggestionInput />', () => {
   it('renders correctly', () => {
      const tree = renderer
         .create(<PaletteEditor
               palette={{ name: 'palette', paints: [{ name: 'c1' }, { name: 'c2' }, { name: 'c3' }]}}
               suggestions={ ['a', 'b', 'c'] }
               onNameChange={ () => 'action' }
               onDelete={ () => 'action' }
               onAddColor={ () => 'action' }
               onColorChange={ () => 'action' }
               onColorDelete={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   })
});
