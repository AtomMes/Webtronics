<template>
  <div class="flex gap-3">
    <NuxtLink v-for="(breadCrumb, i) in breadCrumbs" :key="i"
              :to="breadCrumb.href" class="flex gap-3 last:font-bold">
      {{ breadCrumb.text }}
      <p v-if="i < breadCrumbs.length - 1">>
      </p>
    </NuxtLink>
  </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const breadCrumbs = ref([]);

watchEffect(() => {
  breadCrumbs.value = route.meta.breadCrumbs;
});
</script>
