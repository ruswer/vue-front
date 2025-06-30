<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 mb-4 gap-4">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span class="text-xl font-semibold text-gray-800">Filtrlar</span>
      </div>
      <button
        @click="$emit('open-modal')"
        class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Yangi To'lov Qo'shish
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Filial</label>
        <select v-model="localFilters.branch" class="form-select p-3">
          <option value="">Barcha filiallar</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Guruh</label>
        <select v-model="localFilters.group" class="form-select p-3">
          <option value="">Barcha guruhlar</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Oy</label>
        <select v-model="localFilters.month" class="form-select p-3">
          <option value="">Barcha Oylar</option>
          <option v-for="(monthName, monthNumber) in months" :key="monthNumber" :value="monthNumber">{{ monthName }}</option>
        </select>
        <div class="mt-2 flex flex-wrap gap-2">
          <button v-for="(monthName, monthNumber) in months" :key="'btn-'+monthNumber" type="button" class="px-3 py-1 rounded bg-gray-100 hover:bg-blue-200 text-sm" @click="localFilters.month = monthNumber">
            {{ monthName }}
          </button>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Yil</label>
        <select v-model="localFilters.year" class="form-select p-3">
          <option value="">Barcha Yillar</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
        <div class="mt-2 flex flex-wrap gap-2">
          <button v-for="year in years" :key="'btn-'+year" type="button" class="px-3 py-1 rounded bg-gray-100 hover:bg-blue-200 text-sm" @click="localFilters.year = year">
            {{ year }}
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-end gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700">O'quvchi (Ism, Tel)</label>
        <input v-model="localFilters.search" type="search" placeholder="Qidirish..." class="form-input p-3" />
      </div>
      <button @click="emitSearch" class="btn-primary w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 text-lg font-semibold">
        Qidirish
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  filters: Object,
  branches: Array,
  groups: Array,
  months: Object,
  years: Array
})
const emit = defineEmits(['update:filters', 'search', 'open-modal'])
const localFilters = ref({ ...props.filters })

watch(localFilters, (val) => {
  emit('update:filters', val)
}, { deep: true })

function emitSearch() {
  emit('search')
}
</script>

<style scoped>
.form-select, .form-input {
  @apply mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm;
}
.btn-primary {
  @apply inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700;
}
</style>
