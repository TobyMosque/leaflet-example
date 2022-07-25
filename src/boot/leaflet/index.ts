import { InjectionKey } from 'vue';

export const leafletKey: InjectionKey<typeof import('leaflet')> =
  Symbol('leaflet');
