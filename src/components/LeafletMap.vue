<template>
  <render></render>
</template>

<script lang="ts">
import { Ref, InjectionKey } from 'vue';
import { Map } from 'src/boot/leaflet';

type RefMap = Ref<Map | undefined>;
export const leafletMapKey: InjectionKey<RefMap> = Symbol();
</script>

<script setup lang="ts">
import { h, ref, computed, watch, inject, provide, useSlots } from 'vue';
import { leafletKey, TileLayer } from 'src/boot/leaflet';

const props = defineProps({
  width: {
    type: Number,
    default: 720,
  },
  height: {
    type: Number,
    default: 480,
  },
  latitude: {
    type: Number,
    default: 38.7223,
  },
  longitude: {
    type: Number,
    default: -9.1393,
  },
  zoom: {
    type: Number,
    default: 13,
  },
  maxZoom: {
    type: Number,
    default: 19,
  },
  template: {
    type: String,
    default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  attribution: {
    type: String,
    default: '© OpenStreetMap',
  },
});

const slots = useSlots();
const elem = ref(null);
const l = inject(leafletKey);
const map = ref<Map>();
const layer = ref<TileLayer>();

provide(leafletMapKey, map);

const viewOptions = computed(() => ({
  center: { lat: props.latitude, lng: props.longitude },
  zoom: props.zoom,
}));
const layerOptions = computed(() => ({
  template: props.template,
  options: {
    maxZoom: props.maxZoom,
    attribution: props.attribution,
  },
}));

function updateMap() {
  if (map.value) {
    map.value.setView(viewOptions.value.center, viewOptions.value.zoom);
  }
}

function updateLayer() {
  if (map.value) {
    if (layer.value) {
      layer.value.removeFrom(map.value);
    }
    layer.value = l?.tileLayer(
      layerOptions.value.template,
      layerOptions.value.options
    );
    layer.value?.addTo(map.value);
  }
}

if (process.env.CLIENT) {
  watch(
    () => elem.value,
    () => {
      if (elem.value && l) {
        map.value = l.map(elem.value);
        updateMap();
        updateLayer();
      }
    },
    { immediate: true }
  );

  watch(
    () => viewOptions.value,
    () => updateMap(),
    { immediate: true, deep: true }
  );

  watch(
    () => layerOptions.value,
    () => updateLayer(),
    { immediate: true, deep: true }
  );
}

const style = computed(
  () => `width: ${props.width}px; height: ${props.height}px;`
);
const render = () => {
  const children = [];
  if (process.env.CLIENT) {
    if (slots.default) {
      children.push(slots.default());
    }
  }
  return h('div', { ref: elem, style: style.value }, children);
};
</script>
