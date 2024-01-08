<template>
  <div v-if="isLogged && currentUser" class="w-full flex justify-center shadow-xl">
    <div class="flex justify-between w-full max-w-5xl p-3">
      <BreadCrumbs />
      <div class="flex gap-3">
        <NuxtLink class="tracking-widest font-semibold" :to="`/profile/${currentUser.id}`">PROFILE</NuxtLink>
        |
        <NuxtLink class="tracking-widest font-semibold" :to="{ name: 'tickets' }">TICKETS</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUsers from '~/store/user.js';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { isLogged, currentUser } = useUsers();
</script>
