import axios from 'axios'
import { WebServices } from '@/services/api'

const addProduct = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'aplication/json',
      accept: '*/*',
    },
  }
  const response = await axios.post(WebServices.products.post, data, config)
  return response.data
}

export { addProduct }
