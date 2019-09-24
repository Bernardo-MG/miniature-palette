import React from 'react'
import renderer from 'react-test-renderer';

import SuggestionInput from 'common/components/SuggestionInput';

describe('<SuggestionInput />', () => {
   it('renders correctly', () => {
      const tree = renderer
         .create(<SuggestionInput
               id='testSuggestionInput'
               label='label'
               placeholder='placeholder'
               suggestions={ ['a', 'b', 'c'] }
               onChange={ () => 'action' }
               onPressEnter={ () => 'action' } />)
         .toJSON();
      expect(tree).toMatchSnapshot();
   })
});
