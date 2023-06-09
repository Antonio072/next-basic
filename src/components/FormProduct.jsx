import { useRef, useState } from 'react'
import { addProduct, updateProduct } from '@api/products'
import { useRouter } from 'next/router'

export default function FormProduct({ product, setOpen, setAlert }) {
  const router = useRouter()
  const formRef = useRef(null)
  const [error, setError] = useState(null)

  function checkData(data) {
    let pass = true
    if (!data.title.match(/\w{5,}/g)) {
      setError('Title must be at least 5 characters')
      pass = false
    }
    if (!data.price.toString().match(/^[0-9]+$/g)) {
      setError('Invalid price')
      pass = false
    }
    if (!data.description.match(/\w{5,}/g)) {
      setError('Description must be at least 5 characters')
      pass = false
    }
    if (!data.images[0].match(/^.+\.(jpg|jpeg|png)$/g)) {
      //verifica la extensión
      setError('Invalid file extension')
      pass = false
    }

    return pass
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(formRef.current)
    const data = {
      title: formData.get('title'),
      price: parseInt(formData.get('price')),
      description: formData.get('description'),
      categoryId: parseInt(formData.get('category')),
      images: [`https://${formData.get('images').name}`],
    }
    const passedCheck = checkData(data)

    try {
      if (passedCheck) {
        if (product) {
          updateProduct(product.id, data).then(() => {
            router.push('/dashboard/products/')
          })
        } else {
          addProduct(data)
          setAlert({
            active: true,
            message: 'Product added successfully',
            type: 'success',
            autoClose: true,
          })
          setOpen(false)
        }
      }
    } catch (error) {
      setAlert({
        active: true,
        message: 'Error adding product',
        type: 'error',
        autoClose: true,
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
              {error}
            </div>
          )}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input defaultValue={product?.title} type="text" name="title" id="title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-700 border rounded-xs" />
            </div>
            <div className="col-span-6 sm:col-span-3 ">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 ">
                Price
              </label>
              <input
                defaultValue={product?.price}
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-700 border rounded-xs"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700" for="category">
                Category
              </label>
              <select
                value={product?.category?.id}
                id="category"
                name="category"
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-700 border bg-xsite rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                defaultValue={product?.description}
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-700 border rounded-xs"
              />
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="images">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border border-xsshed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file </span>
                        <input id="images" name="images" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
