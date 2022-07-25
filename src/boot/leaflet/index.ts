import { InjectionKey } from 'vue';

export type Leaflet = typeof import('leaflet');
export type Map = ReturnType<Leaflet['map']>;
export type TileLayer = ReturnType<Leaflet['tileLayer']>;
export type Marker = ReturnType<Leaflet['marker']>;
export const leafletKey: InjectionKey<Leaflet> = Symbol('leaflet');
