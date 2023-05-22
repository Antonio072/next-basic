import { useState, useEffect } from 'react'
import Image from 'next/image'
import useFetch from '@/hooks/useFetch'
import { WebServices } from '@/services/api'
import Paginate from '@/components/Pagination'
import { Chart } from '@/components/Chart'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

const PRODUCT_LIMIT = 10
const PRODUCT_OFFSET = 5

export default function Dashboard() {
  const [offsetProducts, setOffsetProducts] = useState(PRODUCT_OFFSET)

  const products = useFetch(WebServices.products.getAll(PRODUCT_LIMIT, offsetProducts), offsetProducts)
  const totalProducts = useFetch(WebServices.products.getAll(0, 0)).length
  console.log('>PRODUCTS', products)
  const categoryNames = products?.map((product) => product.category)
  console.log('>>>categoryNames', categoryNames)
  const categoryCount = categoryNames?.map((category) => category.name)
  console.log('>>>categoryCount', categoryCount)

  const countOccurrence = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {})
  console.log('>>>countOccurrence', countOccurrence(categoryCount))

  const data = {
    datasets: [
      {
        label: 'Count:',
        data: countOccurrence(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#F3F4F6', '#F9FAFB'],
      },
    ],
  }

  return (
    <>
      <Chart className="mb-8 mt-2" data={data}></Chart>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {totalProducts > 0 && <Paginate totalItems={totalProducts} itemsPerPage={PRODUCT_LIMIT} setOffset={setOffsetProducts} neighbours={3}></Paginate>}
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {products?.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                      <tr key={`product-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Image className="h-10 w-10 rounded-full" src={product.images[0]} alt="" width={100} height={100} />
                            </div>
                            <div className="ml-4 text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category.name}</div>
                          <div className="text-sm text-gray-900">{product.category.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="edit" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="edit" className="text-indigo-600 hover:text-indigo-900">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center bg-blue-400 text-white">
                  <h1 className="text-2xl font-bold">No data</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
