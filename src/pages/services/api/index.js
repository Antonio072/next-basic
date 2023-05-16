const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
const VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = `${API}/api/${VERSION}`

export const endPoints = {
  auth: {
    login: `${API_URL}/auth/login`,
    profile: `${API_URL}/auth/profile`,
    refreshToken: `${API_URL}/auth/refresh-token`,
  },
  products: {
    getAll: (limit = 0, offset = 0) => `${API_URL}/products?limit=${limit}&offset=${offset}`,
    post: `${API_URL}/products`,
    get: (id) => `${API_URL}/products/${id}`,
    put: (id) => `${API_URL}/products/${id}`,
    delete: (id) => `${API_URL}/products/${id}`,
  },
  users: {
    getAll: (limit) => `${API_URL}/users?limit=${limit}`,
    post: `${API_URL}/users`,
    get: (id) => `${API_URL}/user/${id}`,
    put: (id) => `${API_URL}/user/${id}`,
    delete: (id) => `${API_URL}/user/${id}`,
    available: `${API_URL}/user/is-available`,
  },
  categories: {
    getAll: `${API_URL}/categories`,
    post: `${API_URL}/categories`,
    get: (id) => `${API_URL}/categories/${id}`,
    put: (id) => `${API_URL}/categories/${id}`,
    delete: (id) => `${API_URL}/categories/${id}`,
    products: (id) => `${API_URL}/categories/${id}/products`,
  },
  files: {
    upload: `${API_URL}/files/upload`,
    get: (filename) => `${API_URL}/files/${filename}`,
  },
}
