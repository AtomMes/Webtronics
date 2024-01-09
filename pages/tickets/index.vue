<template>
  <div class="w-full mt-[5%]">
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
