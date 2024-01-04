<template>
  <div
    class="shadow-2xl rounded-xl w-full px-8 py-6 max-w-[450px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <form @submit.prevent="onLogin" class="flex flex-col justify-center gap-4 w-full mb-1 mt-2">
      <div>
        <p class="text-[24px] text-center font-bold mb-1">Welcome</p>
        <p class="text-[18px] text-center text-gray-400 mb-5">
          Enter your credentials to log in
        </p>
      </div>
      <div>
        <div class="flex flex-col gap-0.5">
          <label class="font-semibold">Username</label>
          <input
            v-model="username"
            class="border w-full rounded-[6px] p-2"
            placeholder="username"
          />
        </div>
      </div>
      <div class="relative">
        <img
          src="/assets/images/closedEye.png"
          alt="show"
          v-if="!visiblePassword"
          @click="visiblePassword = true"
          class="cursor-pointer w-[18px] mt-[3px] absolute right-2 top-[33px]"
        />
        <img
          src="/assets/images/openEye.png"
          alt="hide"
          v-if="visiblePassword"
          @click="visiblePassword = false"
          class="cursor-pointer w-[18px] mt-[6px] absolute right-2 top-[33px]"
        />
        <div class="flex flex-col gap-0.5">
          <label class="font-semibold">Password</label>
          <input
            v-model="password"
            class="border w-full rounded-[6px] p-2"
            placeholder="password"
            :type="visiblePassword?'text':'password'"
          />
        </div>
        <label v-if="showError" class="font-semibold text-red-500">incorrect username or password</label>
      </div>
      <div class="flex justify-end w-full relative mt-4">
        <button
          class="border rounded-[6px] py-1 pb-2 bg-emerald-400 hover:bg-emerald-500 transition text-white text-center text-[18px] w-full font-semibold"
          type="submit"
        >
          Log in
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue';
import useUsers from '~/store/user.js';
import {useRouter} from 'vue-router';
import dbService from '@/services/dbService.js';
import useTickets from '~/store/tickets.js';

const router = useRouter();
const password = ref('');
const username = ref('');
const showError = ref(false);
const visiblePassword = ref(false);
const { login, setLogged } = useUsers();
const { setTickets } = useTickets();

watch([username, password], () => {
  showError.value = false;
});

onMounted(async () => {
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));
  if (isLogged) {
    await router.push('/');
  }
});

const onLogin = async () => {
  if (username.value === 'admin' && password.value === 'admin') {
    localStorage.setItem('isLogged', JSON.stringify(true));
    await setLogged();
    const user = await dbService.login();
    const tickets = await dbService.getTickets();
    await login(user);
    await setTickets(tickets);
    await router.push('/');
  } else {
    showError.value = true;
  }
};

</script>
