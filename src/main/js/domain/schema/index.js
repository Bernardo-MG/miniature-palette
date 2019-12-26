import { schema } from 'normalizr';

/**
 * Paint schema.
 */
export const paint = new schema.Entity('paints', {}, {
   idAttribute: 'id'
});

/**
 * Palette schema.
 */
export const palette = new schema.Entity('palettes', {
   paints: [paint]
}, {
   idAttribute: 'id'
});
