<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-center gap-8 mt-[20%]">
      <p class="text-6xl font-thin tracking-widest text-emerald-500">
        Личный кабинет
      </p>
      <p class="text-2xl text-gray-500">Простой способ отслеживать ваши тикеты</p>
      <NuxtLink to="/tickets" class="bg-emerald-500 hover:bg-emerald-600 transition text-white px-4 py-2 rounded-xl">
        Начать сейчас
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  breadCrumbs: [
    { text: 'Главная', href: '/' }
  ]
});
</script>
