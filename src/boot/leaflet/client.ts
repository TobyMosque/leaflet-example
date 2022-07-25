import { boot } from 'quasar/wrappers';
import { leafletKey } from '.';
import L from 'leaflet';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.provide(leafletKey, L);
});
