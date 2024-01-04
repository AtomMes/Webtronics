<template>
  <div v-if="ticket && currentUser" class="flex justify-center mt-16">
    <div class="flex flex-col w-full max-w-xl border rounded-xl px-6 py-4">
      <p class="text-3xl text-center mb-2.5">{{ ticket.title }}</p>
      <div class="flex justify-between items-center mb-3 gap-10">
        <NuxtLink to="/profile" class="text-2xl font-semibold">
          {{ currentUser.name + ' ' + currentUser.lastName }}
        </NuxtLink>
        <p>{{ formatDate(ticket.date) }}</p>
      </div>
      <p class="text-[18px] text-left">{{ ticket.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import useUsers from '~/store/user.js'
import dbService from '@/services/dbService.js'

definePageMeta({
  breadCrumbs: [
    { text: 'Home', href: '/' },
    { text: 'Tickets', href: '/tickets' },
    { text: 'Ticket', href: 'fullTicket' }
  ]
})

const { currentUser } = useUsers()
const route = useRoute()
const ticket = ref(null)

const formatDate = (rawDate) => {
  const year = String(rawDate).slice(0, 4)
  const month = String(rawDate).slice(4, 6)
  const day = String(rawDate).slice(6, 8)
  return `${day}/${month}/${year}`
}

onMounted(async () => {
  ticket.value = await dbService.getTicketById(route.params.id)
})
</script>
