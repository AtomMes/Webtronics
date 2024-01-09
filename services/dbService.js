import useUsers from '~/store/user.js';

const { currentUser } = useUsers();

export default {
  login: async () => {
    const { data } = await useFetch('https://658d20807c48dce947388cae.mockapi.io/user');
    return data.value[0];
  },

  getUserById: async (id) => {
    const { data } = await useFetch('https://658d20807c48dce947388cae.mockapi.io/user/' + id);
    return data.value;
  },

  updateUser: async (newData) => {
    return await $fetch('https://658d20807c48dce947388cae.mockapi.io/user/' + currentUser.value.id, {
      method: 'PUT',
      body: newData
    });
  },

  getTickets: async () => {
    const { data } = await useFetch('https://658d20807c48dce947388cae.mockapi.io/tickets');
    return data.value;
  },
};
