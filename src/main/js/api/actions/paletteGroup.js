import * as types from 'api/actions/types';

export const readPaletteGroups = () => {
   return {
      type: types.READ_PALETTE_GROUPS
   };
};

export const paletteGroupsRead = (payload) => {
   return {
      type: types.PALETTE_GROUPS_RECEIVED,
      payload
   };
};

export const savePaletteGroup = (payload) => {
   return {
      type: types.CREATE_PALETTE_GROUP,
      payload
   };
};

export const paletteGroupSaved = (payload) => {
   return {
      type: types.PALETTE_GROUP_SAVED,
      payload
   };
};

export const updatePaletteGroup = (payload) => {
   return {
      type: types.UPDATE_PALETTE_GROUP,
      payload
   };
};

export const paletteGroupUpdated = (payload) => {
   return {
      type: types.PALETTE_GROUP_UPDATED,
      payload
   };
};
