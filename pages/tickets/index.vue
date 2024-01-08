<template>
  <div class="flex flex-col gap-2 w-full mt-[5%]">
    <p class="text-3xl font-semibold py-4">
      Tickets
    </p>
    <TicketsTable />
  </div>
</template>

<script setup>
definePageMeta({
  breadCrumbs: [
    { text: 'Home', href: '/' },
    { text: 'Tickets', href: '/tickets' }
  ]
});
</script>
