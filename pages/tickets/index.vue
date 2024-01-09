<template>
  <div class="flex flex-col gap-2 w-full mt-[5%]">
    <p class="text-3xl font-semibold py-4">
      Тикеты
    </p>
    <TicketsTable />
  </div>
</template>

<script setup>
definePageMeta({
  breadCrumbs: [
    { text: 'Главная', href: '/' },
    { text: 'Тикеты', href: '/tickets' }
  ]
});
</script>
