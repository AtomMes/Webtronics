<template>
  <div class="relative">
    <Vue3EasyDataTable
      v-if="tickets?.length"
      buttons-pagination
      table-class-name="tickets-table"
      hide-footer
      :headers="columns"
      :items="tickets"
    >
      <template #item-id="{id}">
        <p>{{ id }}</p>
      </template>
      <template #item-author="{authorId}">
        <TicketAuthor :id="authorId" />
      </template>
      <template #item-description="{description}">
        <div class="flex">
          <p class="overflow-hidden whitespace-nowrap w-14">
            {{ description }}
          </p>
          <span>...</span>
        </div>
      </template>
      <template #item-date="{ date }">
        <p>{{ formatRawDate(date) }}</p>
      </template>
      <template #item-details="{ id }">
        <NuxtLink :to="`/tickets/${id}`" class="text-white bg-emerald-400 hover:bg-emerald-500 px-3 py-1 rounded">
          Подробнее
        </NuxtLink>
      </template>
      <template #item-title="{title}">
        <p>{{ title }}</p>
      </template>
    </Vue3EasyDataTable>
    <button
      v-if="tickets?.length"
      class="absolute h-7 w-7 top-1 right-1 z-[9999] flex items-center justify-center rounded bg-emerald-400 hover:bg-emerald-500"
      @click="showColumnsSettings = true">
      <span class="relative pointer">
        <img src="/assets/images/settings.png" alt="Settings" />
        <FiltersDropdown v-if="showColumnsSettings" :show-filter="showColumnsSettings" @close-filter="toggleFilter" />
      </span>
    </button>
  </div>
</template>

<script setup>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {ref} from 'vue';
import useTickets from '~/store/tickets.js';
import useUsers from '~/store/user.js';
import {formatRawDate} from '../composables/dateFormats.js';

const { currentUser } = useUsers();
const { tickets, columns } = useTickets();
const showColumnsSettings = ref(false);

const toggleFilter = () => {
  showColumnsSettings.value = !showColumnsSettings.value;
};
</script>
