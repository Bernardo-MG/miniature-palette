INSERT INTO palette_groups (id, name) VALUES
   (10, 'Group1');

INSERT INTO palettes (id, group_id, name) VALUES
   (10, 10, 'Palette1'),
   (11, 10, 'Palette2'),
   (12, 10, 'Palette3');

INSERT INTO paints (id, palette_id, name) VALUES
   (10, 10, 'Paint1'),
   (11, 11, 'Paint2'),
   (12, 11, 'Paint3'),
   (13, 12, 'Paint4'),
   (14, 12, 'Paint5'),
   (15, 12, 'Paint6');
