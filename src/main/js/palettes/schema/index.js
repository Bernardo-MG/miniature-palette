import { schema } from 'normalizr';

/**
 * Document schema.
 */
export const palette = new schema.Entity('palettes', {}, {
   idAttribute: 'name'
});
