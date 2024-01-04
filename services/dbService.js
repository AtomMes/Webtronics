import axios from 'axios';

const dbClient = axios.create({
  baseURL: `https://658d20807c48dce947388cae.mockapi.io/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  login: async () => {
    const user = await dbClient.get('user');
    return user.data[0];
  },

  updateUser: async (newData) => {
    return await dbClient.put('user/1', newData);
  },

  getTickets: async () => {
    const tickets = await dbClient.get('tickets');
    return tickets.data;
  },

  getTicketById: async (id) => {
    const res = await dbClient.get('tickets?id=' + id);
    return res.data[0];
  }
};

