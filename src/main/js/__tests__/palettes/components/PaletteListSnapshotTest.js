import React from 'react'
import renderer from 'react-test-renderer';

import PaletteList from 'palettes/components/PaletteList';

describe('<PaletteList />', () => {
   it('renders correctly when there is no data', () => {
      const tree = renderer
         .create(<PaletteList
               data={[{ name: '', paints: [] }]}
               onEdit={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   }),
   it('renders correctly with a full palette', () => {
      const tree = renderer
         .create(<PaletteList
               data={[{ id: 1, name: 'name', paints: [ {name: 'paint'} ] }]}
               onEdit={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   })
});
