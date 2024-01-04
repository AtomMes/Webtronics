import { reactive, toRefs } from 'vue'

const state = reactive({
  columns: [
    { id: '1', text: 'Id', value: 'id', sortable: true },
    { id: '2', text: 'Автор', value: 'author' },
    { id: '3', text: 'Заголовок', value: 'title' },
    { id: '4', text: 'Описание', value: 'description' },
    { id: '5', text: 'Дата создания', value: 'date', sortable: true },
    { id: '6', text: 'Подробности', value: 'details' }
  ],
  tickets: []
})

function setTickets (tickets) {
  return state.tickets = tickets
}

function hideColumnById (id) {
  state.columns = state.columns.filter((ticket) => +ticket.id !== +id)
}

function showColumn (newHeader) {
  const index = state.columns.findIndex((header) => +header.id === +newHeader.id)

  if (index !== -1) {
    state.columns[index] = newHeader
  } else {
    const insertIndex = state.columns.findIndex((header) => +header.id > +newHeader.id)

    if (insertIndex !== -1) {
      state.columns.splice(insertIndex, 0, newHeader)
    } else {
      state.columns.push(newHeader)
    }
  }
}

export default function useTickets () {
  return { ...toRefs(state), hideColumnById, showColumn, setTickets }
}
