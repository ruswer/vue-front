<template>
  <div class="min-h-screen flex flex-col m-4">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-[30%] bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800 self-start">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          {{ editingCategoryId ? 'Kategoriyani Tahrirlash' : "Yangi Kategoriya Qo'shish" }}
        </h2>
        <CategoryForm
          :form="form"
          :editingCategoryId="editingCategoryId"
          :loading="loading"
          @submit="saveCategory"
          @reset="resetForm"
        />
      </div>
      <div class="w-full lg:w-[70%] bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800 lg:self-start">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">Kategoriyalar ro'yxati</h2>
        <CategoryTable
          :paginatedCategories="paginatedCategories"
          :filteredCategories="filteredCategories"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :searchQuery="searchQuery"
          @edit="editCategory"
          @delete="deleteCategory"
          @sort="sort"
          @set-page="val => currentPage.value = val"
          @reset-filters="resetFilters"
        >
          <template #sort-icon="{ field }">
            <svg v-if="sortField === field" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            <svg v-else class="w-3 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </template>
        </CategoryTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import CategoryForm from '@/components/expenses/category/CategoryForm.vue'
import CategoryTable from '@/components/expenses/category/CategoryTable.vue'
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Chiqimlar', to: '/expenses' },
  { text: 'Kategoriyalar', to: '/expenses/categories', active: true }
]
const categories = ref([
  { id: 1, name: 'Ofis ijara', description: 'Ofis uchun ijara to‘lovlari', status: 'active' },
  { id: 2, name: 'Kommunal to‘lovlar', description: 'Suv, elektr, gaz va boshqa kommunal to‘lovlar', status: 'active' },
  { id: 3, name: 'Reklama', description: 'Reklama va marketing uchun chiqimlar', status: 'inactive' },
])
const form = ref({ name: '', description: '', status: 'active' })
const editingCategoryId = ref(null)
const loading = ref(false)
const searchQuery = ref('')
const sortField = ref('name')
const sortDirection = ref('asc')
const currentPage = ref(1)
const perPage = 5
function saveCategory(formData) {
  loading.value = true
  setTimeout(() => {
    if (editingCategoryId.value) {
      const idx = categories.value.findIndex(c => c.id === editingCategoryId.value)
      if (idx !== -1) categories.value[idx] = { ...categories.value[idx], ...formData }
    } else {
      categories.value.push({ id: Date.now(), ...formData })
    }
    resetForm()
    loading.value = false
  }, 500)
}
function editCategory(cat) {
  editingCategoryId.value = cat.id
  form.value = { name: cat.name, description: cat.description, status: cat.status }
}
function resetForm() {
  editingCategoryId.value = null
  form.value = { name: '', description: '', status: 'active' }
}
function sort(key) {
  if (sortField.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = key
    sortDirection.value = 'asc'
  }
}
function resetFilters() {
  searchQuery.value = ''
  currentPage.value = 1
}
function deleteCategory(id) {
  categories.value = categories.value.filter(cat => cat.id !== id)
  if (editingCategoryId.value === id) resetForm()
}
const filteredCategories = computed(() => {
  let result = categories.value.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (cat.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  if (sortField.value) {
    result = result.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})
const totalPages = computed(() => Math.ceil(filteredCategories.value.length / perPage))
const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredCategories.value.slice(start, start + perPage)
})
</script>
<style scoped>
</style>
