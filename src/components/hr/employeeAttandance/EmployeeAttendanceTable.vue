<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b dark:border-gray-700">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Xodimlar ro'yxati ({{ selectedDate ? formatDate(selectedDate) : 'Sana tanlanmagan' }})
      </h2>
      <Button v-if="sortedStaffList.length" type="success" @click="$emit('save-attendance')" :disabled="loading">
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span>Saqlash</span>
        </span>
      </Button>
    </div>
    <div v-if="attendanceExistsForDate" class="flex items-center gap-4 rounded-lg border border-primary-300 bg-primary-50 p-4 text-primary-600 dark:border-primary-600 dark:bg-gray-800 dark:text-primary-400 mb-4" role="alert">
      <svg class="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
      <span class="font-medium">Bu kunga davomat allaqachon qilingan.</span> Uni quyidagi jadvalda o'zgartirishingiz mumkin.
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm whitespace-nowrap bg-white dark:text-gray-300">
        <thead class="border-b-2 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50">
          <tr>
            <th @click="sortBy('id')" class="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none">
              <div class="flex items-center gap-1">
                #
                <svg v-if="sortField === 'id'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
                <svg v-else class="w-3 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </th>
            <th @click="sortBy('full_name')" class="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none">
              <div class="flex items-center gap-1">
                Nomi
                <svg v-if="sortField === 'full_name'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
                <svg v-else class="w-3 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </th>
            <th class="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Davomat</th>
            <th class="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Izoh</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(staff, index) in sortedStaffList" :key="staff.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ staff.full_name }}</td>
            <td class="px-6 py-4">
              <div class="flex flex-col space-y-2">
                <label v-for="status in statuses" :key="status.value" class="inline-flex items-center cursor-pointer">
                  <input
                    v-model="attendanceData[staff.id].status"
                    type="radio"
                    :value="status.value"
                    :name="'attendance_' + staff.id"
                    class="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 !rounded-full dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-offset-gray-800"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ status.label }}</span>
                </label>
              </div>
            </td>
            <td class="px-6 py-4">
              <input
                v-model="attendanceData[staff.id].comment"
                type="text"
                :name="'note_' + staff.id"
                placeholder="Izoh kiriting..."
                class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 dark:disabled:bg-gray-800 p-3"
                :disabled="attendanceData[staff.id].status === 'not_working'"
              />
            </td>
          </tr>
          <tr v-if="sortedStaffList.length === 0">
            <td colspan="4" class="text-center py-12 px-6 text-gray-500 dark:text-gray-400">
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.01A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span class="font-medium">Xodimlar topilmadi</span>
                <p class="text-sm text-gray-400">Tanlangan filial va sana uchun ma'lumot mavjud emas.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
const props = defineProps({
  sortedStaffList: Array,
  attendanceData: Object,
  statuses: Array,
  sortField: String,
  sortDirection: String,
  sortBy: Function,
  selectedDate: String,
  formatDate: Function,
  attendanceExistsForDate: Boolean,
  loading: Boolean
})
</script>
