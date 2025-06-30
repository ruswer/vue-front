<template>
  <div class="min-h-screen flex flex-col m-4">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
      <!-- Chap panel (30%) - Kategoriya qo'shish/tahrirlash -->
      <div class="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">
          {{ editingSource ? 'Reklama turini tahrirlash' : 'Yangi reklama turi' }}
        </h2>
        <AdvertTypeForm
          :form="form"
          :editingSource="editingSource"
          :loading="loading"
          @save="save"
          @reset-form="resetForm"
        />
      </div>
      <!-- O'ng panel (70%) -->
      <div class="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Reklama turi ro'yhati</h2>
        <AdvertTypeTable
          :paginatedSources="paginatedSources"
          :search="search"
          :sortField="sortField"
          :sortDirection="sortDirection"
          :totalPages="totalPages"
          :currentPage="currentPage"
          @edit="edit"
          @remove="remove"
          @sort-by="sortBy"
          @reset-filters="resetFilters"
          @set-page="val => currentPage = val"
          v-model:search="search"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import AdvertTypeForm from '@/components/marketing/advert-types/AdvertTypeForm.vue'
import AdvertTypeTable from '@/components/marketing/advert-types/AdvertTypeTable.vue'
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Marketing', to: '/marketing' },
  { text: 'Reklama turlari', to: '/marketing/advert-types', active: true }
]
// Demo data
const sources = ref([
  { id: 1, name: 'Banner reklama' },
  { id: 2, name: 'Video reklama' },
  { id: 3, name: 'SMM reklama' },
])
const form = ref({ name: '' })
const editingSource = ref(null)
const loading = ref(false)
const search = ref('')
const sortField = ref('name')
const sortDirection = ref('asc')
const currentPage = ref(1)
const perPage = 5
const filteredSources = computed(() => {
  let result = sources.value.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
  if (sortField.value) {
    result = result.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})
const totalPages = computed(() => Math.ceil(filteredSources.value.length / perPage))
const paginatedSources = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredSources.value.slice(start, start + perPage)
})
function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}
function edit(item) {
  editingSource.value = item.id
  form.value = { ...item }
}
function remove(item) {
  if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
    sources.value = sources.value.filter(s => s.id !== item.id)
    if (editingSource.value === item.id) resetForm()
  }
}
function save() {
  loading.value = true
  setTimeout(() => {
    if (editingSource.value) {
      // Update
      const idx = sources.value.findIndex(s => s.id === editingSource.value)
      if (idx !== -1) sources.value[idx] = { ...form.value, id: editingSource.value }
    } else {
      // Create
      const newId = sources.value.length ? Math.max(...sources.value.map(s => s.id)) + 1 : 1
      sources.value.push({ ...form.value, id: newId })
    }
    resetForm()
    loading.value = false
  }, 500)
}
function resetForm() {
  editingSource.value = null
  form.value = { name: '' }
}
function resetFilters() {
  search.value = ''
  currentPage.value = 1
}
</script>
<style scoped>
</style>
