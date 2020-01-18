import { crudRequests, fileRequests } from 'api/operations';

import { normalize } from 'normalizr';
import { palette as paletteSchema, paletteGroup as paletteGroupSchema } from 'domain/schema';

function normalizePalette(response) {
   const normalized = normalize(response, [paletteSchema]);
   let result;

   if (normalized.entities.palettes) {
      result = normalized.entities;
   } else {
      result = { palettes: [], paints: [] };
   }

   return result;
}

function normalizePaletteGroup(response) {
   const normalized = normalize(response, [paletteGroupSchema]);
   let result;

   if (normalized.entities.paletteGroups) {
      result = normalized.entities;
   } else {
      result = {};
   }

   return result;
}

const PaletteGroups = {
   all: () => crudRequests.get('/rest/palette/group').then((response) => response.content).then(normalizePaletteGroup),
   create: (palette) => crudRequests.post('/rest/palette/group', palette),
   update: (palette) => crudRequests.put('/rest/palette/group', palette)
};

const Palettes = {
   all: () => crudRequests.get('/rest/palette/').then((response) => response.content).then(normalizePalette),
   create: (palette) => crudRequests.post('/rest/palette/', palette),
   update: (palette) => crudRequests.put('/rest/palette/', palette.id, palette),
   delete: (id) => crudRequests.delete('/rest/palette/', id),
   report: (id) => fileRequests.download(`/report/palette/${id}`, 'palettes.pdf')
};

export default {
   Palettes,
   PaletteGroups
};
