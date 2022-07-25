<template>
  <q-page class="row items-center justify-evenly">
    <leaflet-map>
      <leaflet-mark />
    </leaflet-map>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeafletMap from 'components/LeafletMap.vue';
import LeafletMark from 'src/components/LeafletMark.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { LeafletMap, LeafletMark },
});
</script>
