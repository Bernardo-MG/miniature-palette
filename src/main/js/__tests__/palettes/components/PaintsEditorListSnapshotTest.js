import React from 'react'
import renderer from 'react-test-renderer';

import PaintsEditorList from 'palettes/components/PaintsEditorList';

describe('<PaintsEditorList />', () => {
   it('renders correctly when there is no data', () => {
      const tree = renderer
         .create(<PaintsEditorList
               data={ [] }
               onAdd={ () => 'action' }
               onRemove={ () => 'action' }
               onChange={ () => 'action' }
               onBlur={ () => 'action' }
               errors={ {} } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   }),
   it('renders correctly with data', () => {
      const tree = renderer
         .create(<PaintsEditorList
               data={ [{ name: 'name' }] }
               onAdd={ () => 'action' }
               onRemove={ () => 'action' }
               onChange={ () => 'action' }
               onBlur={ () => 'action' }
               errors={ {} } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   })
});
