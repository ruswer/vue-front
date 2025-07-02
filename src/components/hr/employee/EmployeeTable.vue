<template>
  <div class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
    <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">Xodimlar</h2>
    <!-- View Toggle Buttons -->
    <div class="flex justify-start mb-6 border-b dark:border-gray-700 pb-4">
      <div class="flex space-x-1 border dark:border-gray-600 rounded-lg p-0.5">
        <button
          type="button"
          @click="$emit('update:displayMode', 'grid')"
          :class="displayMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'"
          class="p-2 rounded-md transition-colors duration-200"
          title="Grid ko'rinishi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          type="button"
          @click="$emit('update:displayMode', 'list')"
          :class="displayMode === 'list' ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'"
          class="p-2 rounded-md transition-colors duration-200"
          title="Ro'yxat ko'rinishi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Grid View -->
    <div v-if="displayMode === 'grid'">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="employee in employees" :key="employee.id" class="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border dark:border-gray-700 flex flex-col transition hover:shadow-md overflow-hidden">
          <div class="p-5 flex-1">
            <div class="flex justify-center mb-4">
              <div class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-center text-gray-900 hover:text-primary-600 dark:hover:text-primary-400 truncate mb-1">
              {{ employee.full_name }}
            </h3>
            <p class="text-sm text-center text-gray-600 dark:text-gray-400">{{ employee.position || 'Lavozim yo\'q' }}</p>
            <p class="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">{{ employee.phone }}</p>
          </div>
          <div class="mt-4 pt-4 border-t dark:border-gray-700 flex justify-end space-x-1">
            <button type="button" title="SMS Yuborish" disabled class="inline-flex items-center justify-center h-8 w-8 rounded-full text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed">
              <span class="sr-only">SMS Yuborish</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.04 8.25-6.75 8.25a8.25 8.25 0 01-8.25-8.25S3 7.444 3 12c0-1.103.268-2.134.743-3.099.446-.91.99-1.748 1.6-2.487V5.25c0-.938.762-1.75 1.75-1.75h8.5c.988 0 1.75.813 1.75 1.75v1.164c.61.74 1.154 1.576 1.6 2.487.475.965.743 1.996.743 3.1z" />
              </svg>
            </button>
            <button type="button" @click="$emit('edit', employee)" title="Tahrirlash" class="inline-flex items-center justify-center h-8 w-8 rounded-full text-info-600 hover:bg-info-500/10 focus:outline-none dark:text-info-400 transition-colors">
              <span class="sr-only">Tahrirlash</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.796a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            <button type="button" @click="$emit('delete', employee)" title="Safdan chiqarish" class="inline-flex items-center justify-center h-8 w-8 rounded-full text-danger-600 hover:bg-danger-500/10 focus:outline-none dark:text-danger-400 transition-colors">
              <span class="sr-only">Safdan chiqarish</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="employees.length === 0" class="col-span-full text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.01A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">Xodimlar topilmadi</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Qidiruv yoki filtr parametrlarini o'zgartirib ko'ring.</p>
        </div>
      </div>
    </div>
    <!-- List View (Table) -->
    <div v-else>
      <div class="overflow-x-auto rounded-lg border dark:border-gray-700">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th v-for="col in columns" :key="col.key" class="px-6 py-3 cursor-pointer" @click="$emit('sort', col.key)">
                <div class="flex items-center gap-1">
                  <span>{{ col.label }}</span>
                  <svg v-if="sortField === col.key" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg v-else class="w-3 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <tr v-for="(employee, idx) in employees" :key="employee.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{{ idx + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ employee.full_name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ employee.position }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ employee.department }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ employee.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ employee.branch }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-1">
                  <button type="button" title="SMS Yuborish" disabled class="inline-flex items-center justify-center h-8 w-8 rounded-full text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed">
                    <span class="sr-only">SMS Yuborish</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.04 8.25-6.75 8.25a8.25 8.25 0 01-8.25-8.25S3 7.444 3 12c0-1.103.268-2.134.743-3.099.446-.91.99-1.748 1.6-2.487V5.25c0-.938.762-1.75 1.75-1.75h8.5c.988 0 1.75.813 1.75 1.75v1.164c.61.74 1.154 1.576 1.6 2.487.475.965.743 1.996.743 3.1z" />
                    </svg>
                  </button>
                  <button type="button" @click="$emit('edit', employee)" title="Tahrirlash" class="inline-flex items-center justify-center h-8 w-8 rounded-full text-info-600 hover:bg-info-500/10 focus:outline-none dark:text-info-400 transition-colors">
                    <span class="sr-only">Tahrirlash</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.796a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button type="button" @click="$emit('delete', employee)" title="Safdan chiqarish" class="inline-flex items-center justify-center h-8 w-8 rounded-full text-danger-600 hover:bg-danger-500/10 focus:outline-none dark:text-danger-400 transition-colors">
                    <span class="sr-only">Safdan chiqarish</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="employees.length === 0">
              <td :colspan="columns.length + 1" class="text-center py-12 px-6">
                <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.01A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">Xodimlar topilmadi</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Qidiruv yoki filtr parametrlarini o'zgartirib ko'ring.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  employees: Array,
  columns: Array,
  displayMode: String,
  sortField: String,
  sortDirection: String
})
</script>
