<template>
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Filiallar ro'yxati</h2>
    <div class="mb-4">
      <label for="table-search" class="sr-only">Qidirish</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="table-search" v-model="search"
          class="block p-3 pl-12 text-base text-gray-900 border border-gray-300 rounded-lg w-full sm:w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Filial, manzil, telefon bo'yicha...">
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm whitespace-nowrap">
        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="$emit('sortBy', 'name')">
              <div class="flex items-center gap-x-1">
                <span>Filial nomi</span>
                <svg class="w-4 h-4" :class="sortField === 'name' ? '' : 'text-gray-400'" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                </svg>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="$emit('sortBy', 'address')">
              <div class="flex items-center gap-x-1">
                <span>Manzil</span>
                <svg class="w-4 h-4" :class="sortField === 'address' ? '' : 'text-gray-400'" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                </svg>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="$emit('sortBy', 'phone')">
              <div class="flex items-center gap-x-1">
                <span>Telefon</span>
                <svg class="w-4 h-4" :class="sortField === 'phone' ? '' : 'text-gray-400'" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                </svg>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="branch in paginatedBranches" :key="branch.id" class="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4">{{ branch.name }}</td>
            <td class="px-6 py-4">{{ branch.address }}</td>
            <td class="px-6 py-4">{{ branch.phone }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end items-center gap-2">
                <button type="button" @click="$emit('edit', branch)" title="Tahrirlash"
                  class="text-blue-600 hover:text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.796a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button type="button" @click="$emit('delete', branch)" title="O'chirish"
                  class="text-red-600 hover:text-red-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedBranches.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              Filiallar topilmadi.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  paginatedBranches: Array,
  sortField: String,
  search: String
})
const emit = defineEmits(['sortBy', 'edit', 'delete', 'update:search'])
</script>
