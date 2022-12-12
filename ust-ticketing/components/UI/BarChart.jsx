import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
const BarChart = ({ data, options }) => {
  //Don't remove
  console.log(ChartJS);
  return (
    <div className='w-full h-96 p-6 border border-secondary-500 rounded-lg'>
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;

