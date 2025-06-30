<template>
  <div class="flex flex-col h-full mx-4 my-6">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <!-- Filter Panel -->
    <div class="mb-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span class="text-xl font-semibold text-gray-800 dark:text-gray-200">Tanlash</span>
        </div>
        <button @click="resetFilters" type="button"
          class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Tozalash
        </button>
      </div>
      <div class="p-4">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap lg:flex-nowrap gap-4">
            <div class="w-full lg:w-1/2">
              <label for="branch" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
              <select id="branch" v-model="selectedBranch"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">Barcha filiallar</option>
                <option v-for="b in branches" :key="b.id" :value="b.id">{{ b.name }}</option>
              </select>
            </div>
            <div class="w-full lg:w-1/2">
              <label for="group" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guruh</label>
              <select id="group" v-model="selectedGroup"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">Barcha guruhlar</option>
                <option v-for="g in allGroups" :key="g.id" :value="g.id">{{ g.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="applyFilters" :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto">
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Qidirish
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Table Panel -->
    <div class="flex-1 bg-white dark:bg-gray-800 rounded-md shadow-sm p-4">
      <div class="flex items-center justify-between mb-4 pb-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200">Guruhlar ro'yxati</h2>
        <button type="button" @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Qo'shish
        </button>
      </div>
      <div class="overflow-x-auto">
        <div class="relative m-[2px] mb-3 mr-5 float-left">
          <label for="tableSearch" class="sr-only">Qidirish</label>
          <input id="tableSearch" type="text" placeholder="Jadvaldan qidirish..." v-model="tableSearch"
            class="block w-64 rounded-lg border dark:border-gray-600 dark:bg-gray-700 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:text-gray-200" />
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-neutral-500 dark:text-neutral-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
        </div>
        <table class="min-w-full text-left text-sm whitespace-nowrap clear-left">
          <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            <tr>
              <th class="px-6 py-3">Filial</th>
              <th class="px-6 py-3">Guruh nomi</th>
              <th class="px-6 py-3">Amallar</th>
            </tr>
          </thead>
          <tbody class="dark:text-gray-200">
            <tr v-for="group in filteredGroups" :key="group.id" class="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4">{{ getBranchName(group.branch_id) }}</td>
              <td class="px-6 py-4">{{ group.name }}</td>
              <td class="px-6 py-4">
                <div class="flex space-x-3">
                  <button type="button" @click="openMarkingModal(group)" title="Baholash"
                    class="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </button>
                  <button type="button" @click="editGroup(group)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L9.38 17.273a4.5 4.5 0 01-1.897 1.13l-2.745.823.823-2.745a4.5 4.5 0 011.13-1.897l10.171-10.17z" />
                    </svg>
                  </button>
                  <button type="button" @click="confirmDelete(group.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredGroups.length === 0">
              <td colspan="3">
                <div class="text-center py-12">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Ma'lumot topilmadi</h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Tanlangan filterlar bo'yicha guruhlar topilmadi.
                  </p>
                  <div class="mt-6">
                    <button @click="resetFilters" type="button"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Filterni tozalash
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Ta'lim", to: '/education/groups', active: true }
]
const branches = ref([
  { id: 1, name: 'Markaziy filial' },
  { id: 2, name: 'Yunusobod filial' },
])
const allGroups = ref([
  { id: 1, name: 'A guruh', branch_id: 1 },
  { id: 2, name: 'B guruh', branch_id: 2 },
])
const selectedBranch = ref('')
const selectedGroup = ref('')
const tableSearch = ref('')
const loading = ref(false)
const showCreateModal = ref(false)
function resetFilters() {
  selectedBranch.value = ''
  selectedGroup.value = ''
  tableSearch.value = ''
}
function applyFilters() {}
const filteredGroups = computed(() => {
  let result = allGroups.value
  if (selectedBranch.value) result = result.filter(g => g.branch_id == selectedBranch.value)
  if (selectedGroup.value) result = result.filter(g => g.id == selectedGroup.value)
  if (tableSearch.value)
    result = result.filter(g =>
      g.name.toLowerCase().includes(tableSearch.value.toLowerCase()) ||
      getBranchName(g.branch_id).toLowerCase().includes(tableSearch.value.toLowerCase())
    )
  return result
})
function getBranchName(id) {
  const b = branches.value.find(x => x.id === id)
  return b ? b.name : '-'
}
function editGroup(group) {
  // Modal logic for editing can be added here
}
function confirmDelete(id) {
  // Add delete confirmation modal logic if needed
}
function openMarkingModal(group) {
  // Add marking modal logic if needed
}
</script>
<style scoped>
</style>
