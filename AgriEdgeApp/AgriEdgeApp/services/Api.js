import axios from 'axios'

export default () => {
  // const data = { baseURL: 'https://agrisoo9-api.um6p.ma/api/' }
  const data = { baseURL: 'http://localhost:4242' }

  return axios.create(data)
}
  