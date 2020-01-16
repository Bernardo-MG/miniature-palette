import React from 'react'
import renderer from 'react-test-renderer';

import PaletteEditor from 'palettes/components/PaletteEditor';

describe('<PaletteEditor />', () => {
   it('renders correctly when there is no data', () => {
      const tree = renderer
         .create(<PaletteEditor
               initialValues={{ name: '', paints: [] }}
               onSave={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   }),
   it('renders correctly with full data', () => {
      const tree = renderer
         .create(<PaletteEditor
               initialValues={{ id:1, name: 'abc', paints: [ {name: 'paint'} ] }}
               onSave={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   }),
   it('renders correctly with full data and delete action', () => {
      const tree = renderer
         .create(<PaletteEditor
               initialValues={{ id:1, name: 'abc', paints: [ {name: 'paint'} ] }}
               onSave={ () => 'action' }
               onDelete={ () => 'action' }/>)
         .toJSON();
      expect(tree).toMatchSnapshot();
   })
});
