import * as types from 'api/actions/types';

export const paletteReport = (payload) => {
   return {
      type: types.GENERATE_PALETTE_REPORT,
      payload
   };
};
