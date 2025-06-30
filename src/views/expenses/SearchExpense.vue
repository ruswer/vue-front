<template>
  <div class="min-h-screen flex flex-col m-4">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <div class="flex flex-col gap-6">
      <!-- Qidiruv filtrlari paneli -->
      <div class="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
        <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span class="text-lg font-semibold text-gray-800 dark:text-gray-200">Filtrlash</span>
          </div>
          <button @click="resetFilters" type="button" class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tozalash
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label for="branch" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
            <select v-model="branchId" id="branch" class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Barcha filiallar</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Chiqim kategoriyasi</label>
            <select v-model="categoryId" id="category" class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Barcha kategoriyalar</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sana (dan)</label>
            <input v-model="startDate" type="date" id="startDate" class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sana (gacha)</label>
            <input v-model="endDate" type="date" id="endDate" class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="searchExpenses" type="button" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            Qidirish
          </button>
        </div>
      </div>
      <!-- Chiqimlar jadvali paneli -->
      <div class="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">Chiqim natijasi</h2>
        <div class="overflow-x-auto">
          <div class="relative mb-3 float-left mr-4">
            <label for="tableSearch" class="sr-only">Qidirish</label>
            <input v-model="tableSearch" id="tableSearch" type="search" placeholder="Jadvaldan qidirish..." class="block w-80 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 py-3 pl-12 pr-4 text-base focus:border-primary-500 focus:ring-primary-500 dark:text-white" />
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-gray-400 dark:text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
          </div>
          <table class="min-w-full text-left text-sm whitespace-nowrap clear-left">
            <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
              <tr>
                <th v-for="col in columns" :key="col.key" class="px-6 py-3 cursor-pointer" @click="sort(col.key)">
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
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="expense in filteredTableExpenses" :key="expense.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="px-6 py-4 dark:text-gray-200">{{ expense.expense_name }}</td>
                <td class="px-6 py-4 dark:text-gray-300">{{ getCategoryName(expense.category_id) }}</td>
                <td class="px-6 py-4 dark:text-gray-300">{{ getBranchName(expense.branch_id) }}</td>
                <td class="px-6 py-4 dark:text-gray-300">{{ formatDate(expense.expense_date) }}</td>
                <td class="px-6 py-4 dark:text-gray-300">{{ paymentTypeLabel(expense.payment_type) }}</td>
                <td class="px-6 py-4 dark:text-gray-200">{{ formatAmount(expense.amount) }} UZS</td>
                <td class="px-6 py-4 dark:text-gray-300">{{ expense.description ? expense.description.slice(0, 40) : '' }}</td>
              </tr>
              <tr v-if="filteredTableExpenses.length === 0">
                <td :colspan="columns.length">
                  <div class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Ma'lumot topilmadi</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Tanlangan filterlar bo'yicha hech qanday chiqim topilmadi.
                    </p>
                    <div class="mt-6">
                      <button @click="resetFilters" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
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
          <!-- Pagination -->
          <div class="mt-4 px-2 flex justify-center">
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="['mx-1 px-3 py-1 rounded', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Chiqimlar', to: '/expenses' },
  { text: 'Chiqimlarni izlash', to: '/expenses/search', active: true }
]
const branches = ref([
  { id: 1, name: 'Markaziy filial' },
  { id: 2, name: 'Yunusobod filial' },
])
const categories = ref([
  { id: 1, name: 'Ofis ijara' },
  { id: 2, name: 'Kommunal to‘lovlar' },
  { id: 3, name: 'Reklama' },
])
const expenses = ref([
  { id: 1, expense_name: 'Ofis ijara', expense_date: '2025-06-01', category_id: 1, branch_id: 1, amount: 1000000, payment_type: 'cash', description: 'Ijaraga oylik to‘lov' },
  { id: 2, expense_name: 'Reklama banner', expense_date: '2025-06-10', category_id: 3, branch_id: 2, amount: 500000, payment_type: 'card', description: 'Banner uchun to‘lov' },
])
const columns = [
  { label: 'Nomi', key: 'expense_name' },
  { label: 'Kategoriya', key: 'category_id' },
  { label: 'Filial', key: 'branch_id' },
  { label: 'Sana', key: 'expense_date' },
  { label: "+To'lov shakli", key: 'payment_type' },
  { label: 'Narxi(sum)', key: 'amount' },
  { label: 'Tavsifi', key: 'description' },
]
const branchId = ref('')
const categoryId = ref('')
const startDate = ref('')
const endDate = ref('')
const loading = ref(false)
const currentPage = ref(1)
const perPage = 5
const sortField = ref('expense_date')
const sortDirection = ref('desc')
const tableSearch = ref('')
function resetFilters() {
  branchId.value = ''
  categoryId.value = ''
  startDate.value = ''
  endDate.value = ''
  tableSearch.value = ''
  currentPage.value = 1
}
function searchExpenses() {
  // loading.value = true
  // setTimeout(() => loading.value = false, 500)
  currentPage.value = 1
}
function sort(key) {
  if (sortField.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = key
    sortDirection.value = 'asc'
  }
}
const filteredExpenses = computed(() => {
  let result = expenses.value.filter(e => {
    const matchesBranch = !branchId.value || e.branch_id == branchId.value
    const matchesCategory = !categoryId.value || e.category_id == categoryId.value
    const matchesDate = (!startDate.value || e.expense_date >= startDate.value) && (!endDate.value || e.expense_date <= endDate.value)
    return matchesBranch && matchesCategory && matchesDate
  })
  if (sortField.value) {
    result = result.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})
const filteredTableExpenses = computed(() => {
  return filteredExpenses.value.filter(e => {
    return (
      e.expense_name.toLowerCase().includes(tableSearch.value.toLowerCase()) ||
      (getCategoryName(e.category_id) || '').toLowerCase().includes(tableSearch.value.toLowerCase()) ||
      (getBranchName(e.branch_id) || '').toLowerCase().includes(tableSearch.value.toLowerCase()) ||
      (e.description || '').toLowerCase().includes(tableSearch.value.toLowerCase())
    )
  })
})
const totalPages = computed(() => Math.ceil(filteredTableExpenses.value.length / perPage))
const paginatedExpenses = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredTableExpenses.value.slice(start, start + perPage)
})
function getCategoryName(id) {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : '-'
}
function getBranchName(id) {
  const branch = branches.value.find(b => b.id === id)
  return branch ? branch.name : '-'
}
function formatDate(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('uz-UZ')
}
function formatAmount(val) {
  return Number(val).toLocaleString('uz-UZ')
}
function paymentTypeLabel(type) {
  switch(type) {
    case 'cash': return 'Naqd'
    case 'card': return 'Karta'
    case 'transfer': return "O'tkazma"
    default: return type
  }
}
</script>
<style scoped>
</style>
