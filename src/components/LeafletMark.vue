<template>
  <render></render>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onBeforeUnmount, useSlots } from 'vue';
import { leafletKey } from 'src/boot/leaflet';
import { leafletMapKey } from './LeafletMap.vue';

const slots = useSlots();
const props = defineProps({
  latitude: {
    type: Number,
    default: 38.7223,
  },
  longitude: {
    type: Number,
    default: -9.1393,
  },
});

const map = inject(leafletMapKey);
const marker = ref<L.Marker>();
const l = inject(leafletKey);

const markerOptions = computed(() => ({
  lat: props.latitude,
  lng: props.longitude,
}));

if (process.env.CLIENT) {
  function updateMarker() {
    if (map && map.value && l) {
      if (!marker.value) {
        marker.value = l.marker(markerOptions.value);
        marker.value.addTo(map.value);
      } else {
        marker.value.setLatLng(markerOptions.value);
      }
    }
  }

  onBeforeUnmount(() => {
    if (map && map.value && marker.value) {
      marker.value.removeFrom(map.value);
    }
  });

  if (map) {
    watch(
      () => map.value,
      () => updateMarker(),
      { immediate: true }
    );

    watch(
      () => markerOptions.value,
      () => updateMarker(),
      { immediate: true, deep: true }
    );
  }
}
const render = () => {
  if (slots.default) {
    return slots.default();
  }
};
</script>
