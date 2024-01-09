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
  <div
    v-else-if="notFound"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 w-full -translate-y-1/2 flex flex-col gap-4 items-center justify-center"
  >
    <p class="text-[50px] font-bold text-center">Ошибка</p>
    <div
      class="h-60 w-60 flex items-center justify-center rounded-full bg-red-600"
    >
      <p class="text-[110px] text-white">404</p>
    </div>
    <p>
      Тикет, который вы ищете, не существует.
      <NuxtLink to="/" class="text-emerald-500 underline font-semibold italic"
      >Вернутся
      </NuxtLink
      >
    </p>
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
const notFound = ref(false);
const author = ref(null);

const { getTicketById } = useTickets();

onMounted(async () => {
  ticket.value = await getTicketById(route.params.id);
  if (!ticket.value) {
    return notFound.value = true;
  }
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
