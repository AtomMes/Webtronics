<template>
  <div>
    <p class="text-3xl font-semibold py-4">
      Tickets
    </p>
    <TicketsTable />
  </div>
</template>

<script>
export default {
  meta: {
    breadCrumb: [
      { text: 'Home', disabled: false, href: 'home' },
      { text: 'Tickets', disabled: false, href: 'tickets' }
    ]
  }
};
</script>
