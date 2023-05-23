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

const deleteProduct = async (id) => {
  const response = await axios.delete(WebServices.products.delete(id))
  return response.data
}

const updateProduct = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.put(WebServices.products.put(id), body, config)

  return response.data
}

export { addProduct, deleteProduct, updateProduct }
