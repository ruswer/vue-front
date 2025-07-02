<template>
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Bilim darajalari ro'yxati</h2>

    <!-- Qidiruv -->
    <div class="mb-4">
      <label for="table-search" class="sr-only">Qidirish</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="table-search" v-model="searchQuery"
               class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Nomi yoki slug bo'yicha...">
      </div>
    </div>

    <!-- Jadval -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm whitespace-nowrap">
        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="sortBy('name')">
              <div class="flex items-center gap-x-1">
                <span>Daraja nomi</span>
                <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="name" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="sortBy('slug')">
              <div class="flex items-center gap-x-1">
                <span>Slug</span>
                <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="slug" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="sortBy('is_active')">
              <div class="flex items-center gap-x-1">
                <span>Holati</span>
                <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="is_active" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredLevels.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              Bilim darajalari topilmadi.
            </td>
          </tr>
          <tr v-for="level in filteredLevels" :key="level.id" class="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 font-medium">{{ level.name }}</td>
            <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ level.slug }}</td>
            <td class="px-6 py-4">
              <span v-if="level.is_active" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/50 dark:text-green-400 dark:ring-green-500/20">
                Faol
              </span>
              <span v-else class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/50 dark:text-red-400 dark:ring-red-500/20">
                Faol emas
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end items-center gap-2">
                <button type="button" @click="$emit('edit', level.id)" title="Tahrirlash" class="text-blue-600 hover:text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.796a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button type="button" @click="$emit('delete', level.id)" title="O'chirish" class="text-red-600 hover:text-red-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Paginatsiya (kerak bo'lsa qo'shiladi) -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SortIcon from '@/components/education/groups/SortIcon.vue'; // Mavjud sort ikonasini ishlatamiz

const props = defineProps({
  levels: {
    type: Array,
    required: true,
  },
});

defineEmits(['edit', 'delete']);

const searchQuery = ref('');
const sortField = ref('name');
const sortDirection = ref('asc');

const filteredLevels = computed(() => {
  let levels = [...props.levels];

  // Qidiruv
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    levels = levels.filter(level => 
      level.name.toLowerCase().includes(query) || 
      level.slug.toLowerCase().includes(query)
    );
  }

  // Saralash
  levels.sort((a, b) => {
    const fieldA = a[sortField.value];
    const fieldB = b[sortField.value];
    let comparison = 0;

    if (typeof fieldA === 'string') {
      comparison = fieldA.localeCompare(fieldB);
    } else if (typeof fieldA === 'boolean') {
      comparison = fieldA === fieldB ? 0 : fieldA ? -1 : 1;
    } else {
      comparison = fieldA - fieldB;
    }
    
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });

  return levels;
});

function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
}
</script>