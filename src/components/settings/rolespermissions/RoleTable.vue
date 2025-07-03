<template>
  <div class="w-full lg:w-[70%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Rollar ro'yxati</h2>
    <div class="overflow-x-auto">
      <div class="relative m-[2px] mb-3 mr-5 float-left">
        <label for="tableSearch" class="sr-only">Qidirish</label>
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          v-model="searchModel"
          id="tableSearch"
          type="text"
          placeholder="Rol bo'yicha qidirish..."
          class="block w-64 rounded-lg border border-gray-300 p-3 shadow-sm pl-10 sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>
      <table class="min-w-full text-left text-sm whitespace-nowrap divide-y divide-gray-200 dark:divide-white/10">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th scope="col"
              @click="$emit('sort-by', 'name')"
              class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer group select-none">
              <div class="flex items-center">
                Rol nomi
                <svg v-if="sortField === 'name' && sortDirection === 'asc'" class="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                <svg v-else-if="sortField === 'name' && sortDirection === 'desc'" class="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                <svg v-else class="w-3 h-3 ml-1 opacity-25 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>
              </div>
            </th>
            <th scope="col" class="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Amallar</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-white/10">
          <tr v-for="role in filteredRoles" :key="role.id" class="hover:bg-gray-50 dark:hover:bg-white/5">
            <td class="px-6 py-4 text-gray-900 dark:text-white">{{ role.name }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button type="button" @click="$emit('assign-permissions', role)" title="Ruxsatlarni belgilash"
                  class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </button>
                <button type="button" @click="$emit('edit', role)" title="Tahrirlash"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.796a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button type="button" @click="$emit('delete', role)" title="O'chirish"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredRoles.length === 0">
            <td colspan="2" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
              <div class="flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v3.776" />
                </svg>
                <p class="mt-2 text-sm font-medium">Rollar topilmadi</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">Qidiruv so'rovini o'zgartirib ko'ring.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
  roles: Array,
  search: String,
  sortField: String,
  sortDirection: String
});
const emit = defineEmits(['assign-permissions', 'edit', 'delete', 'sort-by', 'update:search']);

const searchModel = ref(props.search);
watch(searchModel, val => emit('update:search', val));
watch(() => props.search, val => { if (val !== searchModel.value) searchModel.value = val; });

const filteredRoles = computed(() => {
  let result = props.roles;
  if (searchModel.value) {
    result = result.filter(role => role.name.toLowerCase().includes(searchModel.value.toLowerCase()));
  }
  if (props.sortField) {
    result = [...result].sort((a, b) => {
      const aValue = a[props.sortField]?.toLowerCase?.() || a[props.sortField];
      const bValue = b[props.sortField]?.toLowerCase?.() || b[props.sortField];
      if (aValue < bValue) return props.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return props.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return result;
});
</script>
