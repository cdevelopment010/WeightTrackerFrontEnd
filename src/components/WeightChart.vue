<template>
  <div class="component-container" style="max-height: 500px;display: flex; justify-content: center;">
    <ChartComponent :type="'line'" id="weightChart" :data="chartData" :options="chartOptions" :key="props.chartKey" />
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
    label: 'Weight (kg)',
    data: [],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.3
  }]
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: 'Weight Tracker'
    }
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
}

watch(() => props.chartKey, () => {
  chartData.value.labels = props.data.map((entry: any) => new Date(entry.date).toLocaleDateString());
  chartData.value.datasets[0].data = props.data.map((entry: any) => entry.weight);
})


onMounted(async () => {

})

</script>