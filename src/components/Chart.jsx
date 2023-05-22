import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend)

export const Chart = ({ data }) => {
  console.log('>>>data', data)
  return (
    <>
      <Bar
        data={data}
        options={{
          title: {
            display: true,
            text: 'Category',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      ></Bar>
    </>
  )
}
