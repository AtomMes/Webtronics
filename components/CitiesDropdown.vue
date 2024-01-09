<template>
  <div
    v-show="showDropdown"
    ref="clickBox"
    class="absolute z-50 left-0 bg-white rounded-md shadow-2xl w-40 overflow-y-auto max-h-[148px]"
  >
    <button
      v-for="(city, i) in cities"
      :key="i"
      v-bind="$attrs"
      @click="handleCityClick(city)"
      class="w-full text-left flex gap-1 px-2 py-2 text-sm text-gray-900 hover:bg-gray-50 border-b">
      {{ city }}
    </button>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const cities = ref([
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург',
  'Казань', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград',
  'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск'
]);
const clickBox = ref(null);
let count = 0;

const emit = defineEmits(['toggleDropdown', 'choseCity']);
defineProps(['showDropdown']);

const clickListener = () => {
  if (count === 0) {
    count++;
  } else {
    count = 0;
    emit('toggleDropdown');
    removeClickListener();
  }
};

window.addEventListener('click', clickListener);
const removeClickListener = () => {
  window.removeEventListener('click', clickListener);
};

const handleCityClick = (city) => {
  emit('toggleDropdown');
  emit('choseCity', city);
};
</script>
