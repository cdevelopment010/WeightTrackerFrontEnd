<template>
  <div class="component-container" style="max-height: 500px;display: flex; justify-content: center;">
    <ChartComponent :type="'line'" id="bodyfatChart" :data="chartData" :options="chartOptions" :key="props.chartKey" />
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart as ChartComponent } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import type { ChartOptions } from 'chart.js';

const props = defineProps<{
  chartKey: number,
  data: any,
}>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Body Fat (%)',
    yAxisID: 'y',
    data: [],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.3
  },{
    label: 'Muscle Mass (%)',
    data: [],
    yAxisID: 'y1',
    fill: false,
    borderColor: 'rgb(155, 192, 192)',
    tension: 0.3
  }

  ]
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: 'Body Fat & Muscle Mass (%)'
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      display: true, 
      type: 'linear', 
      position: 'left', 
      title: {
        display: true, 
        text: 'Body Fat (%)'
      }
    },
    y1: {
      beginAtZero: false,
      display: true, 
      type: 'linear', 
      position: 'right', 
      grid: {
        drawOnChartArea: false
      },
      title: {
        display: true, 
        text: 'Muscle Mass (%)'
      }
    }
  }
} as ChartOptions<'line'>

watch(() => props.chartKey, () => {
  chartData.value.labels = props.data.map((entry: any) => new Date(entry.date).toLocaleDateString());
  chartData.value.datasets[0].data = props.data.map((entry: any) => entry.bodyFat);
  chartData.value.datasets[1].data = props.data.map((entry: any) => entry.muscleMass);
})


onMounted(async () => {

})

</script>