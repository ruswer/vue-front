<template>
  <div class="w-full bg-white rounded-md shadow-sm p-4">
    <h2 class="text-lg font-medium text-gray-900 mb-4 pb-4 border-b">Jins bo'yicha taqsimot</h2>
    <div class="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4">
      <div class="w-full lg:w-3/5">
        <div class="rounded-md mb-4 lg:mb-0">
          <h3 class="text-gray-800 mb-4 pb-2 font-medium">O'quvchilarning umumiy soni: {{ total }}</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2 px-4 font-medium text-gray-700 bg-gray-100">Jinsi</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-700 bg-gray-100">Soni</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="(count, gender) in data" :key="gender">
                  <td class="py-2 px-4">{{ gender }}</td>
                  <td class="py-2 px-4">{{ count }}</td>
                </tr>
                <tr v-if="!Object.keys(data).length">
                  <td colspan="2" class="py-4 px-4 text-center text-gray-500">Ma'lumot topilmadi.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/5">
        <div class="h-full border rounded-md flex flex-col">
          <div class="p-4 border-b bg-gray-50">
            <h3 class="font-medium text-gray-700">Jins bo'yicha taqsimot</h3>
          </div>
          <div class="flex flex-col sm:flex-row items-start p-4 gap-4">
            <div class="w-full sm:w-1/3 space-y-2">
              <h4 class="text-sm font-medium text-gray-600 mb-2">Jinslar:</h4>
              <div v-for="(count, gender) in data" :key="gender" class="flex items-center gap-2 text-sm">
                <span :class="['w-2 h-2 rounded-full', genderColorClass(gender)]"></span>
                <span>{{ gender }}: {{ count }}</span>
              </div>
              <p v-if="!Object.keys(data).length" class="text-sm text-gray-500">Ma'lumot yo'q.</p>
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
  data: { type: Object, required: true },
  total: { type: Number, required: true }
})
const canvas = ref(null)
let chartInstance = null
function genderColorClass(gender) {
  const g = gender.toLowerCase()
  if (g === 'erkak') return 'bg-blue-500'
  if (g === 'ayol') return 'bg-pink-500'
  return 'bg-gray-400'
}
function renderChart() {
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(canvas.value, {
    type: 'pie',
    data: {
      labels: Object.keys(props.data),
      datasets: [{
        data: Object.values(props.data),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(107, 114, 128, 0.7)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(107, 114, 128, 1)'
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
