<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="border-b border-gray-200 dark:border-white/10">
      <div class="py-4 space-y-2">
        <h2 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
          Xodimlar davomati hisoboti ({{ selectedMonth ? months[selectedMonth] : '' }} {{ selectedYear }})
        </h2>
        <div class="relative max-w-xs">
          <label for="tableSearch" class="sr-only">Qidirish</label>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input :value="search" @input="$emit('update:search', $event.target.value)" id="tableSearch" type="text" placeholder="Xodim bo'yicha qidirish..." class="block w-full rounded-lg border border-gray-300 shadow-sm pl-10 p-3 sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm whitespace-nowrap divide-y divide-gray-200 dark:divide-white/10">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th scope="col" @click="$emit('sort', 'id')" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer group">
              <div class="flex items-center">№ <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="id" /></div>
            </th>
            <th scope="col" @click="$emit('sort', 'full_name')" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer group">
              <div class="flex items-center">Xodim Nomi <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="full_name" /></div>
            </th>
            <th scope="col" @click="$emit('sort', 'department_name')" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer group">
              <div class="flex items-center">Bo'lim <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="department_name" /></div>
            </th>
            <th scope="col" @click="$emit('sort', 'present_count')" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer group">
              <div class="flex items-center">Ishtirok etgan <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="present_count" /></div>
            </th>
            <th scope="col" @click="$emit('sort', 'absent_count')" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer group">
              <div class="flex items-center">Qatnashmagan <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="absent_count" /></div>
            </th>
            <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Amallar</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-white/10">
          <tr v-if="paginatedData.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
              <div class="flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p class="mt-2 text-sm font-medium">Ma'lumot topilmadi</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">Filtrlarni o'zgartirib ko'ring.</p>
              </div>
            </td>
          </tr>
          <tr v-for="record in paginatedData" :key="record.id" class="hover:bg-gray-50 dark:hover:bg-white/5">
            <td class="px-6 py-4 text-gray-900 dark:text-white">{{ record.id }}</td>
            <td class="px-6 py-4 text-gray-900 dark:text-white">{{ record.full_name }}</td>
            <td class="px-6 py-4 text-gray-900 dark:text-white">{{ record.department_name }}</td>
            <td class="px-6 py-4 text-green-600 dark:text-green-400">{{ record.present_count }}</td>
            <td class="px-6 py-4 text-red-600 dark:text-red-400">{{ record.absent_count }}</td>
            <td class="px-6 py-4">
              <button v-if="record.absent_count > 0" @click="$emit('view-absent-dates', record)" type="button" title="Qatnashmagan kunlarni ko'rish" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
     <div v-if="totalPages > 1" class="border-t border-gray-200 dark:border-white/10 p-4 flex justify-between items-center">
          <button @click="$emit('update:currentPage', currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 border rounded disabled:opacity-50">Oldingisi</button>
          <span>Sahifa {{ currentPage }} / {{ totalPages }}</span>
          <button @click="$emit('update:currentPage', currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded disabled:opacity-50">Keyingisi</button>
      </div>
  </div>
</template>

<script setup>
import SortIcon from '../../education/groups/SortIcon.vue';

defineProps({
  paginatedData: Array,
  sortField: String,
  sortDirection: String,
  selectedMonth: [String, Number],
  selectedYear: [String, Number],
  months: Object,
  search: String,
  currentPage: Number,
  totalPages: Number,
});

defineEmits(['sort', 'view-absent-dates', 'update:search', 'update:currentPage']);
</script>