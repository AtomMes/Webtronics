<template>
  <div v-show="showFilter" ref="clickBox"
       class="absolute z-50 right-0 top-6 bg-white rounded-md shadow-2xl w-40 overflow-y-auto max-h-[148px]">
    <button v-for="(localColumn, i) in localColumns" v-bind="$attrs" @click="handleColumnClick(localColumn)" :key="i"
            class="w-full text-left flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-gray-50 border-b">
      <input type="checkbox" :checked="columns.some(column => column.id === localColumn.id)">
      {{ localColumn.text }}
    </button>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import useTickets from '~/store/tickets.js';

defineProps(['showFilter']);
const emit = defineEmits(['closeFilter']);
const { columns, hideColumnById, showColumn } = useTickets();
const clickBox = ref(null);

let count = 0;
let localColumns = [
  { id: '1', text: 'Id', value: 'id', sortable: true },
  { id: '3', text: 'Заголовок', value: 'title' },
  { id: '4', text: 'Описание', value: 'description' },
  { id: '5', text: 'Дата создания', value: 'date', sortable: true }
];

const clickListener = (e) => {
  if (count === 0) {
    count++;
  } else if (!clickBox.value?.contains(e.target)) {
    count = 0;
    emit('closeFilter');
    removeListener();
  }
};

window.addEventListener('click', clickListener);

const removeListener = () => {
  window.removeEventListener('click', clickListener);
};

const handleColumnClick = (localColumn) => {
  let isShown = columns.value.some(column => Number(column.id) === Number(localColumn.id));
  if (isShown) {
    hideColumnById(localColumn.id);
  } else {
    showColumn(localColumn);
  }
};
</script>
