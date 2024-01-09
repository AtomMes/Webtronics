<template>
  <div class="w-full flex h-12 justify-center shadow-xl">
    <div v-if="isLogged && currentUser" class="flex justify-between w-full max-w-5xl p-3">
      <BreadCrumbs />
      <div class="flex gap-3">
        <NuxtLink class="tracking-widest font-semibold" :to="`/profile/${currentUser.id}`">Профиль</NuxtLink>
        |
        <NuxtLink class="tracking-widest font-semibold" :to="{ name: 'tickets' }">Тикеты</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUsers from '~/store/user.js';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { isLogged, currentUser } = useUsers();
</script>
