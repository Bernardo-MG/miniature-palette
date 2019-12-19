import React from 'react'
import renderer from 'react-test-renderer';

import PaletteEditor from 'palettes/components/PaletteEditor';

describe('<SuggestionInput />', () => {
   it('renders correctly', () => {
      const tree = renderer
         .create(<PaletteEditor
               initialValues={{ name: '', paints: [] }}
               suggestions={ ['a', 'b', 'c'] }
               onSave={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   })
});
