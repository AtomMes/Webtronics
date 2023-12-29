<template>
  <div class="flex gap-3">
    <RouterLink v-for="(breadCrumb, i) in breadCrumbs" :key="i"
                :to="{name:breadCrumb.href}" class="flex gap-3 last:font-bold">
      {{ breadCrumb.text }}
      <p v-if="i < breadCrumbs.length - 1">>
      </p>
    </RouterLink>
  </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const breadCrumbs = ref([]);

const generateBreadCrumbs = () => {
  const metaBreadcrumbs = route.meta.breadCrumb;

  if (metaBreadcrumbs) {
    breadCrumbs.value = metaBreadcrumbs.map((item) => ({
      text: item.text,
      disabled: item.disabled,
      href: item.href
    }));
  }
};

watchEffect(() => {
  breadCrumbs.value = route.meta.breadCrumb;
});

onMounted(generateBreadCrumbs);
</script>
