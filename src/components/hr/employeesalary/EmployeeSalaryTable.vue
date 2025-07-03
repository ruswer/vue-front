<template>
  <div class="fi-ta rounded-xl bg-white shadow-sm dark:bg-gray-900 p-4">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">
          Xodimlar ro'yxati ({{ selectedMonth ? months[selectedMonth] : '' }} {{ selectedYear }})
      </h2>

      <div class="fi-ta-content relative overflow-x-auto">
          <!-- Search input -->
          <div class="relative m-[2px] mb-3 mr-5 float-left">
              <label for="inputSearch" class="sr-only">Qidirish</label>
              <input :value="search" @input="$emit('update:search', $event.target.value)"
                     id="inputSearch"
                     type="text"
                     placeholder="Xodim bo'yicha qidirish..."
                     class="block w-64 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 pl-10 p-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:text-white p-3" />
              <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-neutral-500 dark:text-neutral-200">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </span>
          </div>
          <table class="min-w-full text-left text-sm whitespace-nowrap">
              <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                  <tr>
                      <th scope="col" @click="$emit('sort', 'full_name')" class="px-6 py-4 cursor-pointer group"><div class="flex items-center">Xodim Nomi <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="full_name" /></div></th>
                      <th scope="col" @click="$emit('sort', 'final_salary')" class="px-6 py-4 cursor-pointer group"><div class="flex items-center">Jami <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="final_salary" /></div></th>
                      <th scope="col" @click="$emit('sort', 'total_paid')" class="px-6 py-4 cursor-pointer group"><div class="flex items-center">To'langan <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="total_paid" /></div></th>
                      <th scope="col" @click="$emit('sort', 'debt')" class="px-6 py-4 cursor-pointer group"><div class="flex items-center">Qarz <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="debt" /></div></th>
                      <th scope="col" class="px-6 py-4">Amallar</th>
                  </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-if="paginatedData.length === 0">
                      <td colspan="5" class="text-center py-12 px-6 text-gray-500 dark:text-gray-400">
                          <div class="flex flex-col items-center">
                              <svg class="w-12 h-12 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.166 1.318m0 0A1.5 1.5 0 0 1 5.536 17.818a1.5 1.5 0 0 1-1.8-1.8A1.5 1.5 0 0 1 5.536 14.22m6.48 2.098a1.5 1.5 0 0 1 1.8 1.8a1.5 1.5 0 0 1-1.8 1.8a1.5 1.5 0 0 1-1.8-1.8a1.5 1.5 0 0 1 1.8-1.8Zm4.49-2.097a1.5 1.5 0 0 1 1.8 1.8a1.5 1.5 0 0 1-1.8 1.8a1.5 1.5 0 0 1-1.8-1.8a1.5 1.5 0 0 1 1.8-1.8Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 4.875 4.875 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662 0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 4.875 4.875 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.092-1.21.138-2.43.138-3.662Z" />
                              </svg>
                              <span class="font-medium">Xodimlar topilmadi</span>
                              <p class="text-sm text-gray-400">Filtr parametrlarini o'zgartirib ko'ring.</p>
                          </div>
                      </td>
                  </tr>
                  <tr v-for="record in paginatedData" :key="record.id" class="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td class="px-6 py-4 dark:text-white">{{ record.full_name }}</td>
                      <td class="px-6 py-4">
                          <input
                              :value="record.final_salary"
                              @input="$emit('update:salary', { id: record.id, value: $event.target.value })"
                              type="number"
                              placeholder="0"
                              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                      </td>
                      <td class="px-6 py-4">
                          <div class="fi-ta-text px-3 py-4 text-sm text-green-600 dark:text-green-400">
                              {{ (record.total_paid || 0).toLocaleString() }}
                          </div>
                      </td>
                      <td class="px-6 py-4">
                          <div class="fi-ta-text px-3 py-4 text-sm" :class="record.debt > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'">
                              {{ (record.debt || 0).toLocaleString() }}
                          </div>
                      </td>
                      <td class="px-6 py-4">
                          <div class="flex space-x-1">
                              <button type="button"
                                  @click="$emit('save-salary', record.id)"
                                  class="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                  title="Saqlash"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                  </svg>
                              </button>

                              <button type="button"
                                  @click="$emit('open-payment-modal', record)"
                                  class="inline-flex items-center justify-center h-8 w-8 rounded-full text-blue-600 hover:bg-blue-500/10 focus:outline-none dark:text-blue-400 transition-colors"
                                  title="To'lov qo'shish"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                              </button>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="border-t border-gray-200 dark:border-white/10 p-4 mt-4 flex justify-between items-center">
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
  search: String,
  currentPage: Number,
  totalPages: Number,
  selectedMonth: [String, Number],
  selectedYear: [String, Number],
  months: Object,
});

defineEmits(['sort', 'update:search', 'update:currentPage', 'update:salary', 'save-salary', 'open-payment-modal']);
</script>