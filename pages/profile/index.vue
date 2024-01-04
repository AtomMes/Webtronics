<template>
  <div v-if="currentUser" class="flex flex-col gap-5 items-center justify-center">
    <div class="flex items-center text-[30px] gap-5">
      <div>
        <input ref="nameInputRef" v-if="editName" class="border w-min" @blur="editName = false" v-model="updatedName"
               @keyup.enter="updateName" @keyup.esc="editName = false" />
        <p v-else @click="editName = !editName" class="cursor-pointer">Имя - {{ currentUser.name }}</p>
      </div>
      <div>
        <input ref="lastnameInputRef" v-if="editLastname" class="border w-min" @blur="editLastname = false "
               v-model="updatedLastname"
               @keyup.enter="updateLastname" @keyup.esc="editLastname = false" />
        <p v-else @click="editLastname = !editLastname" class="cursor-pointer">Фамилия - {{ currentUser?.lastName }}</p>
      </div>
    </div>
    <div class="flex justify-center items-center gap-5">
      <div class='flex items-center justify-center gap-2'>
        <p>Дата рождения</p>
        <span>-</span>
        <div>
          <VueDatePicker v-model="updatedBirthDate" :enable-time-picker="false" :clearable="false"
                         class="!w-[150px]"
                         :selectDate="updateBirthDate(updatedBirthDate)"
          />
        </div>
      </div>
      <div class="w-0.5 h-[35px] bg-gray-200"></div>
      <div class="flex items-center justify-center gap-2 w-fit">
        <p>Город проживания</p>
        <span>-</span>
        <div class="relative">
          <button class="flex items-center border rounded-[4px] gap-2 py-[7.5px] px-2" @click="toggleDropdown">
            {{ currentUser.city }}
          </button>
          <CitiesDropdown v-if="showDropdown" :show-dropdown="showDropdown" @toggle-dropdown="toggleDropdown"
                          @chose-city="choseCity" />
        </div>
      </div>
    </div>
    <button class="border rounded-xl px-5 py-2" @click="onLogout">Logout</button>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import useUsers from '~/store/user.js';
import {useRouter} from 'vue-router';
import dbService from '@/services/dbService.js';

const { currentUser, logout } = useUsers();
const router = useRouter();
const showDropdown = ref(false);
const editName = ref(false);
const editLastname = ref(false);
const updatedName = ref(null);
const updatedLastname = ref(null);
const updatedBirthDate = ref(null);
const nameInputRef = ref(null);
const lastnameInputRef = ref(null);

definePageMeta({
  breadCrumbs: [
    { text: 'Home', href: '/' },
    { text: 'Profile', href: '/profile' }
  ]
});

watch(editName, () => {
  updatedName.value = currentUser.value.name;
  nextTick(() => {
    if (editName.value) {
      nameInputRef.value.focus();
    }
  });
});

watch(editLastname, () => {
  updatedLastname.value = currentUser.value.lastName;
  nextTick(() => {
    if (editLastname.value) {
      lastnameInputRef.value.focus();
    }
  });
});

watch(currentUser, () => {
  updatedBirthDate.value = currentUser.value?.birthDate;
});

onMounted(() => {
  updatedBirthDate.value = currentUser.value?.birthDate;
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const updateName = async () => {
  await dbService.updateUser({ name: updatedName.value });
  currentUser.value.name = updatedName.value;
  editName.value = false;
};

const updateLastname = async () => {
  await dbService.updateUser({ lastName: updatedLastname.value });
  currentUser.value.lastName = updatedLastname.value;
  editLastname.value = false;
};

const updateBirthDate = async (birthDate) => {
  if (birthDate && birthDate !== currentUser.value.birthDate) {
    await dbService.updateUser({ birthDate: birthDate });
  }
};

const onLogout = () => {
  logout();
  router.push({ name: 'login' });
  localStorage.removeItem('isLogged');
};

const choseCity = async (newCity) => {
  currentUser.value.city = newCity;
  await dbService.updateUser({ city: newCity });
};
</script>
