<template>
  <div v-if="isLogged" class="flex gap-5 justify-between">
    <BreadCrumbs />
    <div class="flex gap-3">
      <NuxtLink class="tracking-widest font-semibold" :to="{ name: 'profile' }">PROFILE</NuxtLink>
      |
      <NuxtLink class="tracking-widest font-semibold" :to="{ name: 'tickets' }">TICKETS</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import useUsers from '~/store/user.js';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { isLogged } = useUsers();
</script>
