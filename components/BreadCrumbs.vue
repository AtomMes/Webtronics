<template>
  <div class="flex gap-3">
    <RouterLink v-for="(breadCrumb, i) in breadCrumbs" :key="i"
                :to="breadCrumb.href" class="flex gap-3 last:font-bold">
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
  if (route.name === 'index') {
    breadCrumbs.value = [
      { text: 'Home', disabled: false, href: '/' }
    ];
  } else if (route.name === 'tickets') {
    breadCrumbs.value = [
      { text: 'Home', disabled: false, href: '/' },
      { text: 'Tickets', disabled: false, href: 'tickets' }
    ];
  } else if (route.name === 'profile') {
    breadCrumbs.value = [
      { text: 'Home', disabled: false, href: '/' },
      { text: 'Profile', disabled: false, href: 'profile' }
    ];
  } else if (route.name === 'tickets-id') {
    breadCrumbs.value = [
      { text: 'Home', disabled: false, href: '/' },
      { text: 'Tickets', disabled: false, href: 'tickets' },
      { text: 'Ticket', disabled: false, href: 'fullTicket' }
    ];
  }
});

onMounted(generateBreadCrumbs);
</script>
