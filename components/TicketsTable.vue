<template>
  <div class="relative">
    <Vue3EasyDataTable
      v-if="tickets?.length"
      buttons-pagination
      :headers="columns"
      :items="tickets"
    >
      <template #item-id="{id}">
        <p>{{ id }}</p>
      </template>
      <template #item-author>
        <div class="player-wrapper">
          <RouterLink to="/profile">
            {{ currentUser?.name + ' ' + currentUser?.lastName }}
          </RouterLink>
        </div>
      </template>
      <template #item-description="{description}">
        <div class="flex">
          <p class="overflow-hidden whitespace-nowrap w-14">
            {{ description }}
          </p>...
        </div>
      </template>
      <template #item-date="{ date }">
        <p>{{ formatDate(date) }}</p>
      </template>
      <template #item-details="{ id }">
        <RouterLink :to="`/tickets/${id}`" class="text-white bg-emerald-400 hover:bg-emerald-500 px-3 py-1 rounded">
          Подробнее
        </RouterLink>
      </template>
      <template #item-title="{title}">
        <p>{{ title }}</p>
      </template>
    </Vue3EasyDataTable>
    <button
      v-if="tickets?.length"
      @click="showFilter = true"
      class="absolute top-1 right-1 z-[9999] flex items-center justify-center h-7 rounded px-2 leading-none text-sm font-light bg-emerald-400 hover:bg-emerald-500 text-white cursor-pointer">
      <div class="relative pointer">Filter
        <FiltersDropdown v-if="showFilter" :show-filter="showFilter" @close-filter="toggleFilter" />
      </div>
    </button>
  </div>
</template>

<script setup>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {ref} from 'vue';
import useTickets from '@/stores/tickets.js';
import useUsers from '@/stores/user.js';

const { currentUser } = useUsers();
const { tickets, columns } = useTickets();
const showFilter = ref(false);

const formatDate = (rawDate) => {
  const year = String(rawDate).slice(0, 4);
  const month = String(rawDate).slice(4, 6);
  const day = String(rawDate).slice(6, 8);
  return `${day}/${month}/${year}`;
};
const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};

</script>
