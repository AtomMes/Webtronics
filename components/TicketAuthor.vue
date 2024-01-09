<template>
  <NuxtLink v-if="ticketAuthor" :to="`/profile/${id}`">
    {{ ticketAuthor?.name + ' ' + ticketAuthor?.lastName }}
  </NuxtLink>
  <p v-else>
    Loading...
  </p>
</template>

<script setup>
import {ref} from 'vue';
import dbService from '~/services/dbService.js';

const props = defineProps(['id']);
const ticketAuthor = ref(null);

onMounted(async () => {
  ticketAuthor.value = await dbService.getUserById(props.id);
});
</script>
