<template>
  <div class="mx-4 my-6">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
      <!-- Left panel: Add Branch -->
      <div class="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-shrink-0">
        <BranchForm :newBranch="newBranch" :loading="loading" :createBranch="createBranch" />
      </div>
      <!-- Right panel: Branches Table -->
      <div class="w-full lg:w-[70%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <BranchTable
          :paginatedBranches="paginatedBranches"
          :sortField="sortField"
          :search="search"
          @sortBy="sortBy"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, reactive } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import BranchForm from '@/components/education/branches/BranchForm.vue'
import BranchTable from '@/components/education/branches/BranchTable.vue'

const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Ta'lim", to: '/education/branches', active: true }
]
const loading = ref(false)
const search = ref('')
const sortField = ref('name')
const sortDirection = ref('asc')
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingBranch = ref(null)
const deletingBranch = ref(null)
const newBranch = reactive({
  name: '',
  address: '',
  phone: ''
})
const branches = ref([
  { id: 1, name: 'Markaziy filial', address: 'Toshkent, Chilonzor', phone: '+998 90 123 45 67' },
  { id: 2, name: 'Yunusobod filial', address: 'Toshkent, Yunusobod', phone: '+998 91 234 56 78' }
])
function createBranch() {
  if (!newBranch.name || !newBranch.address || !newBranch.phone) return
  const id = branches.value.length ? Math.max(...branches.value.map(b => b.id)) + 1 : 1
  branches.value.push({ id, name: newBranch.name, address: newBranch.address, phone: newBranch.phone })
  Object.assign(newBranch, { name: '', address: '', phone: '' })
}
function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}
const filteredBranches = computed(() => {
  let result = branches.value
  if (search.value) {
    const s = search.value.toLowerCase()
    result = result.filter(b =>
      b.name.toLowerCase().includes(s) ||
      b.address.toLowerCase().includes(s) ||
      b.phone.toLowerCase().includes(s)
    )
  }
  if (sortField.value) {
    result = result.slice().sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})
const paginatedBranches = computed(() => filteredBranches.value) // No real pagination for demo
function openEditModal(branch) {
  editingBranch.value = { ...branch }
  showEditModal.value = true
}
function updateBranch() {
  const idx = branches.value.findIndex(b => b.id === editingBranch.value.id)
  if (idx !== -1) {
    branches.value[idx] = { ...editingBranch.value }
  }
  showEditModal.value = false
}
function openDeleteModal(branch) {
  deletingBranch.value = branch
  showDeleteModal.value = true
}
function confirmDeleteBranch() {
  branches.value = branches.value.filter(b => b.id !== deletingBranch.value.id)
  showDeleteModal.value = false
}
</script>
<style scoped>
</style>