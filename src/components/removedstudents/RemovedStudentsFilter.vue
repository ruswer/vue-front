<template>
  <div class="mb-4 bg-white rounded-md shadow">
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span class="text-xl font-semibold text-gray-800">Tanlash</span>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row items-start justify-between bg-white p-4 gap-4">
      <div class="flex flex-col gap-4 w-full lg:w-[60%]">
        <div class="flex flex-wrap lg:flex-nowrap gap-4">
          <div class="w-full sm:w-1/2 lg:flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Filial</label>
            <select v-model="selectedBranch" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3">
              <option value="">Barcha filiallar</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>
          <div class="w-full sm:w-1/2 lg:flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Guruh</label>
            <select v-model="selectedGroup" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3">
              <option value="">Barcha guruhlar</option>
              <option v-for="group in groups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="$emit('search-by-filters')" :disabled="loadingFilters" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <svg v-if="loadingFilters" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span v-else>Qidirish (Filtr)</span>
          </button>
        </div>
      </div>
      <div class="w-full lg:w-[30%]">
        <label class="block text-sm font-medium text-gray-700 mb-1">Kalit so'z bo'yicha izlash</label>
        <input v-model="search" type="search" placeholder="Ism, familiya, telefon..." class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3" />
        <div class="flex justify-end mt-2">
          <button @click="$emit('search-by-keyword')" :disabled="loadingKeyword" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <svg v-if="loadingKeyword" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span v-else>Qidirish (Kalit so'z)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedBranch: String,
    selectedGroup: String,
    search: String,
    loadingFilters: Boolean,
    loadingKeyword: Boolean,
    branches: Array,
    groups: Array
  }
}
</script>
