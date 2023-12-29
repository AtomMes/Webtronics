import { reactive, toRefs } from 'vue'

const userState = reactive({
  isLogged: false,
  currentUser: null
})

function login (user) {
  userState.currentUser = user
}

function setLogged () {
  userState.isLogged = true
}

function logout () {
  userState.isLogged = false
}

export default function useUsers () {
  return { ...toRefs(userState), login, logout, setLogged }
}
