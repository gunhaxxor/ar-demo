<script setup lang="ts">
import { hc } from 'hono/client';
import type { AppType } from '@/api';
import { computed, onMounted, reactive, watch } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import TheWelcome from '../components/TheWelcome.vue'

const client = hc<AppType>(`http://localhost:5173/api`)
const apiData = reactive({
  valueA: 0,
  valueB: 0
})
const boxPos = computed(() => {
  const newPos = `${apiData.valueA} 0 -${apiData.valueB}`
  console.log(newPos)
  return newPos;
})
watch(apiData, () => {
  client.index.$post({
    json: {
      valueA: apiData.valueA,
      valueB: apiData.valueB
    }
  })
})
useIntervalFn(async () => {
  const response = await client.index.$get();
  const data = await response.json();
  apiData.valueA = data.valueA;
  apiData.valueB = data.valueB;
}, 400)
onMounted(async () => {
})
</script>

<template>
  <main>
    <!-- <div class="bg-amber-500 w-fit">
      <input type="number" v-model="apiData.valueA">
      <input type="number" v-model="apiData.valueB">
    </div> -->
    <a-scene xr-mode-ui="enabled: true">
      <a-box :position="boxPos" rotation="0 0 0" color="#4CC3D9"></a-box>
      <a-box :position="`0 0 -4`" rotation="0 0 0" color="#4CC3D9"></a-box>
    </a-scene>
  </main>
</template>
