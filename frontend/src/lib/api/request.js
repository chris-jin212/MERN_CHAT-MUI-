import axios from 'axios'
const API_ROOT = process.env.REACT_APP_SERVER_URI

axios.defaults.baseURL = API_ROOT

export const fetchUsers = (id) => {
  return axios.get(`/api/users?id=${id}`)
    .then(res => res.data.users)
}
