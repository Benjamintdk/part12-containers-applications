import axios from 'axios'

const REACT_APP_BACKEND_URL="http://localhost:3001"

const apiClient = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
})

export default apiClient