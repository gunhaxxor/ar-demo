<template>
    <div class="w-fit">
      <div>
        <input class="w-12" type="number" v-model="apiData.valueA">
        <input type="range" min="-10" max="10" step="0.01" v-model.number="apiData.valueA">
      </div>
      <div>
        <input class="w-12" type="number" v-model="apiData.valueB">
        <input type="range" min="-10" max="10" step="0.01" v-model.number="apiData.valueB">
      </div>
    </div>
</template>
<script setup lang="ts">
import { hc } from 'hono/client';
import type { AppType } from '@/api';
import { onMounted, reactive, watch } from 'vue';
const client = hc<AppType>('http://localhost:3333')
const apiData = reactive({
  valueA: 0,
  valueB: 0
})
watch(apiData, () => {
  client.api.$post({
    json: {
      valueA: apiData.valueA,
      valueB: apiData.valueB
    }
  })
})
onMounted(async () => {
  const response = await client.api.$get();
  const data = await response.json();
  apiData.valueA = data.valueA;
  apiData.valueB = data.valueB;
})
</script>