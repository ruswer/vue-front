<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Kabinetlar bo'yicha dars jadvallari
      </h2>
      <!-- Kabinetlar ro'yxati -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cabinet in cabinets"
          :key="cabinet.id"
          @click="$emit('filter-by-room', cabinet.id)"
          :class="[
            'px-4 py-4 text-sm font-medium rounded-md transition-colors',
            selectedCabinetId === cabinet.id
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ cabinet.name }}
          <span v-if="getScheduleCountForCabinet(cabinet.id)" class="ml-2 px-2 py-1 text-xs rounded-full bg-white text-blue-600">
            {{ getScheduleCountForCabinet(cabinet.id) }}
          </span>
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">
              Vaqt
            </th>
            <th v-for="day in weekDays" :key="day.dayNum" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {{ day.short }} <br>
              <span class="text-xs">{{ day.date }}</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="time in timeSlots" :key="time">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ time }}
            </td>
            <td v-for="day in weekDays" :key="day.dayNum" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <div v-if="getScheduleForTimeAndDay(time, day.dayNum)" class="p-2 bg-blue-50 dark:bg-blue-900/50 rounded">
                <div class="font-medium">{{ getScheduleForTimeAndDay(time, day.dayNum).group?.name }}</div>
                <div class="text-xs">{{ getScheduleForTimeAndDay(time, day.dayNum).teacher?.full_name }}</div>
                <div class="text-xs">{{ getScheduleForTimeAndDay(time, day.dayNum).cabinet?.name }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  weekDays: Array,
  timeSlots: Array,
  getScheduleForTimeAndDay: Function,
  cabinets: Array,
  selectedCabinetId: [Number, null],
  getScheduleCountForCabinet: Function
})
</script>
