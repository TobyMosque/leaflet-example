<template>
  <q-page class="row items-center justify-evenly">
    <leaflet-map>
      <leaflet-mark />
    </leaflet-map>
  </q-page>
</template>

<script setup lang="ts">
import LeafletMap from 'components/LeafletMap.vue';
import LeafletMark from 'src/components/LeafletMark.vue';
</script>
