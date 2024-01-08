<template>
  <div class="flex gap-3">
    <div v-for="(breadCrumb, i) in breadCrumbs" :key="i" class="flex gap-3 last:font-bold">
      <NuxtLink
        :to="breadCrumb.href">
        {{ breadCrumb.text }}
      </NuxtLink>
      <p v-if="i < breadCrumbs.length - 1">>
      </p>
    </div>
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
