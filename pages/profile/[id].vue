<template>
  <div v-if="user && currentUser" class="flex justify-center gap-5 mt-[10%] w-full">
    <div class="flex flex-col gap-5 items-center justify-center p-10 rounded-xl shadow-2xl w-full max-w-xl">
      <div class="items-center text-[22px] justify-between w-full gap-10 rounded-xl border">
        <div class="flex w-full px-4 py-1">
          <div class="flex justify-between w-full">
            <div>Имя</div>
            <div class="w-1/2" v-if="!editProfile">{{ user.name }}</div>
            <input v-else class="w-1/2 focus:outline-none italic font-thin"
                   :class="{'underline decoration-emerald-500':user.name !== updatedProfile.name}"
                   v-model="updatedProfile.name"
            />
          </div>
        </div>
        <div class="flex w-full px-4 py-1 border-t">
          <div class="flex justify-between w-full">
            <div>Фамилия</div>
            <div class="w-1/2" v-if="!editProfile">{{ user.lastName }}</div>
            <input v-else class="w-1/2 focus:outline-none italic font-thin"
                   :class="{'underline decoration-emerald-500':user.lastName !== updatedProfile.lastName}"
                   v-model="updatedProfile.lastName">
          </div>
        </div>
        <div class="flex w-full px-4 py-1 border-t">
          <div class="flex justify-between w-full">
            <div>Дата рождения</div>
            <div v-if="!editProfile" class="w-1/2">{{ formatDate(user.birthDate) }}</div>
            <div v-else class="w-1/2">
              <VueDatePicker
                v-model="updatedProfile.birthDate" :enable-time-picker="false" :clearable="false"
                :selectDate="updateBirthDate(updatedProfile.birthDate)"
                format="dd.mm.yyyy"
              >
                <template #trigger>
                  <p class="italic font-thin cursor-pointer"
                     :class="{'underline decoration-emerald-500':formatDate(user.birthDate) !== formatDate(updatedProfile.birthDate)}"
                  >{{ formatDate(updatedProfile.birthDate) }}</p>
                </template>
              </VueDatePicker>
            </div>
          </div>
        </div>
        <div class="flex w-full px-4 py-1 border-t">
          <div class="flex justify-between w-full">
            <div>Город</div>
            <div v-if="!editProfile" class="w-1/2">{{ user.city }}</div>
            <div v-else class="w-1/2 relative">
              <button
                class="flex items-center rounded-[4px] gap-2 italic font-thin"
                :class="{'underline decoration-emerald-500':user.city !== updatedProfile.city}"
                @click="toggleCitiesDropdown">
                {{ updatedProfile.city }}
              </button>
              <CitiesDropdown
                @toggle-dropdown="toggleCitiesDropdown"
                :show-dropdown="showCitiesDropdown"
                @chose-city="choseCity"
                v-if="showCitiesDropdown"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-2 self-end" v-if="user.id === currentUser.id">
        <template v-if="editProfile">
          <button class="rounded-xl py-1.5 w-24 bg-emerald-500 hover:bg-emerald-600 text-white transition"
                  @click="updateProfile">Сохранить
          </button>
          <button class="rounded-xl py-1.5 w-24 bg-gray-400 text-gray-100" @click="editProfile = false">Отмена
          </button>
        </template>
        <template v-else>
          <button class="rounded-xl py-1.5 w-24 bg-emerald-500 hover:bg-emerald-600 text-white transition"
                  @click="editProfile = true">Изменить
          </button>
          <button class="rounded-xl py-1.5 w-24 bg-red-500 hover:bg-red-600 text-white transition"
                  @click="handleLogout">Выйти
          </button>
        </template>
      </div>
    </div>
  </div>
  <div
    v-else-if="notFound"
    class="mt-[10%] flex flex-col gap-4 items-center justify-center"
  >
    <p class="text-[50px] font-bold text-center">Ошибка</p>
    <div
      class="h-60 w-60 flex items-center justify-center rounded-full bg-red-600"
    >
      <p class="text-[110px] text-white">404</p>
    </div>
    <p>
      Пользователь, которого вы ищете, не существует.
      <NuxtLink to="/" class="text-emerald-500 underline font-semibold italic"
      >Вернутся
      </NuxtLink
      >
    </p>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import useUsers from '~/store/user.js';
import {useRoute, useRouter} from 'vue-router';
import dbService from '@/services/dbService.js';
import {formatDate} from '~/composables/dateFormats.js';

const { currentUser, logout } = useUsers();
const router = useRouter();
const route = useRoute();
const showCitiesDropdown = ref(false);
const editProfile = ref(false);
const user = ref(null);
const notFound = ref(false);

const updatedProfile = reactive({
  id: null,
  name: null,
  lastName: null,
  birthDate: null,
  city: null
});

definePageMeta({
  breadCrumbs: [
    { text: 'Главная', href: '/' },
    { text: 'Профиль', href: '/profile/1' }
  ]
});

watchEffect(async () => {
  notFound.value = false;
  if (currentUser.id === route.params.id) {
    user.value = currentUser.value;
  } else {
    user.value = await dbService.getUserById(route.params.id);
    if (!user.value) {
      notFound.value = true;
    }
  }
});

watch(editProfile, () => {
  updatedProfile.name = user.value.name;
  updatedProfile.lastName = user.value.lastName;
  updatedProfile.city = user.value.city;
  updatedProfile.birthDate = user.value.birthDate;
  updatedProfile.id = user.value.id;
});

const toggleCitiesDropdown = () => {
  showCitiesDropdown.value = !showCitiesDropdown.value;
};

const updateProfile = async () => {
  user.value.name = updatedProfile.name;
  user.value.lastName = updatedProfile.lastName;
  user.value.city = updatedProfile.city;
  user.value.birthDate = updatedProfile.birthDate;
  editProfile.value = false;
  await dbService.updateUser(updatedProfile);
};

const updateBirthDate = async (birthDate) => {
  updatedProfile.birthDate = birthDate;
};

const handleLogout = () => {
  logout();
  router.push({ name: 'login' });
  localStorage.removeItem('isLogged');
};

const choseCity = async (newCity) => {
  updatedProfile.city = newCity;
};
</script>
