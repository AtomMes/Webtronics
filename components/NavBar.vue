<template>
  <div v-if="isLogged" class="flex gap-5 justify-between">
    <BreadCrumbs />
    <div class="flex gap-3">
      <RouterLink class="tracking-widest font-semibold" :to="{ name: 'profile' }">PROFILE</RouterLink>
      |
      <RouterLink class="tracking-widest font-semibold" :to="{ name: 'tickets' }">TICKETS</RouterLink>
    </div>
  </div>
  <div v-else>
    <p>HELLO WORLD</p>
  </div>
</template>

<script setup>
import useUsers from '@/stores/user.js'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

const { isLogged } = useUsers()
</script>
