<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <div class="flex items-center justify-center max-w-5xl w-full px-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import dbService from '~/services/dbService.js';
import useTickets from '~/store/tickets.js';
import useUsers from '~/store/user.js';

const { setTickets } = useTickets();
const { login, setLogged } = useUsers();
const router = useRouter();

onMounted(async () => {
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));
  if (isLogged) {
    setLogged();
    const user = await dbService.login();
    await login(user);
    const tickets = await dbService.getTickets();
    await setTickets(tickets);
  } else {
    await router.push('/login');
  }
});

</script>
