import { InjectionKey } from 'vue';

export type Leaflet = typeof import('leaflet');
export const leafletKey: InjectionKey<Leaflet> = Symbol('leaflet');
