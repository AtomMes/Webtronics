<template>
  <div v-if="ticket && author" class="flex justify-center mt-16">
    <div class="flex flex-col w-full max-w-xl border rounded-xl px-6 py-4">
      <p class="text-3xl text-center mb-2.5">{{ ticket.title }}</p>
      <div class="flex justify-between items-center mb-3 gap-10">
        <NuxtLink :to="`/profile/${ticket.authorId}` " class="text-2xl font-semibold">
          {{ author.name + ' ' + author.lastName }}
        </NuxtLink>
        <p>{{ formatRawDate(ticket.date) }}</p>
      </div>
      <p class="text-[18px] text-left">{{ ticket.description }}</p>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from 'vue';
import useTickets from '~/store/tickets.js';
import dbService from '~/services/dbService.js';
import {formatRawDate} from '~/composables/dateFormats.js';

const route = useRoute();
const ticket = ref(null);
const author = ref(null);

const { getTicketById } = useTickets();


onMounted(async () => {
  ticket.value = await getTicketById(route.params.id);
  author.value = await dbService.getUserById(ticket.value.authorId);
});

definePageMeta({
  breadCrumbs: [
    { text: 'Главная', href: '/' },
    { text: 'Тикеты', href: '/tickets' },
    { text: 'Тикет' }
  ]
});
</script>
