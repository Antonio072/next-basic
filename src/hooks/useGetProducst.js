import { useEffect, useState } from 'react'
import axios from 'axios'

const useGetProducts = (API) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await axios(API)
      console.log('>>DATA', response.data)
      setProducts(response.data.filter((item) => item.images.length > 0 && item.images[0].includes('https://')))
    })()
  }, [])

  return products
}

export default useGetProducts
