<template>
  <div class="w-full bg-white rounded-md shadow-sm p-4 mb-4">
    <h2 class="text-lg font-medium text-gray-900 mb-4 pb-4 border-b">Reklama bo'yicha hisobot</h2>
    <div class="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4">
      <div class="w-full lg:w-3/5">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2 px-4 font-medium text-gray-700 bg-gray-100">Reklama turi</th>
                <th class="text-left py-2 px-4 font-medium text-gray-700 bg-gray-100">Soni</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="item in data" :key="item.name">
                <td class="py-2 px-4">{{ item.name }}</td>
                <td class="py-2 px-4">{{ item.count }}</td>
              </tr>
              <tr v-if="!data.length">
                <td colspan="2" class="py-4 px-4 text-center text-gray-500">Ma'lumot topilmadi.</td>
              </tr>
            </tbody>
            <tfoot v-if="data.length">
              <tr class="border-t">
                <td class="py-2 px-4 font-medium">Jami:</td>
                <td class="py-2 px-4 font-medium">{{ total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="w-full lg:w-2/5">
        <div class="h-full border rounded-md flex flex-col">
          <div class="p-4 border-b bg-gray-50">
            <h3 class="font-medium text-gray-700">Reklama bo'yicha taqsimot</h3>
          </div>
          <div class="flex flex-col sm:flex-row items-start p-4 gap-4">
            <div class="w-full sm:w-1/3 space-y-2">
              <h4 class="text-sm font-medium text-gray-600 mb-2">Manbalar:</h4>
              <div v-for="item in data" :key="item.name" class="flex items-center gap-2 text-sm">
                <span class="w-2 h-2 rounded-full bg-gray-400"></span>
                <span>{{ item.name }}: {{ item.count }}</span>
              </div>
              <p v-if="!data.length" class="text-sm text-gray-500">Ma'lumot yo'q.</p>
            </div>
            <div class="w-full sm:w-2/3" style="height: 200px;">
              <canvas ref="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
const props = defineProps({
  data: { type: Array, required: true },
  total: { type: Number, required: true }
})
const canvas = ref(null)
let chartInstance = null
function renderChart() {
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(canvas.value, {
    type: 'pie',
    data: {
      labels: props.data.map(i => i.name),
      datasets: [{
        data: props.data.map(i => i.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  })
}
watch(() => props.data, async () => { await nextTick(); renderChart() }, { deep: true })
onMounted(() => { renderChart() })
</script>
