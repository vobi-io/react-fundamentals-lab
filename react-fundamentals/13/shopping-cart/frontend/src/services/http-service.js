import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
  }
})

export default axiosInstance
