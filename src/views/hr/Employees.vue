<template>
  <div class="flex flex-col h-full p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="mt-4">
      <EmployeeFilters
        :filters="filters"
        :branch-options="branchOptions"
        :position-options="positionOptions"
        :department-options="departmentOptions"
        :loading="loading"
        @search-employees="searchEmployees"
        @add-employee="onAddEmployee"
      />
      <EmployeeTable
        :employees="sortedEmployees"
        :columns="columns"
        :display-mode="displayMode"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @update:displayMode="displayMode = $event"
        @sort="sort"
        @edit="editEmployee"
        @delete="confirmDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import EmployeeFilters from '@/components/hr/employee/EmployeeFilters.vue'
import EmployeeTable from '@/components/hr/employee/EmployeeTable.vue'

const breadcrumbs = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Kadrlar bo'limi", to: '/hr' },
  { text: 'Xodimlar', to: '/hr/employees', active: true }
]

const branchOptions = ref({ 1: 'Markaziy filial', 2: 'Yunusobod filial' })
const positionOptions = ref({ 1: 'Direktor', 2: 'O‘qituvchi', 3: 'Hisobchi' })
const departmentOptions = ref({ 1: 'Boshqaruv', 2: 'O‘quv bo‘limi', 3: 'Buxgalteriya' })
const filters = ref({ branch_id: '', position_id: '', department_id: '', search: '' })
const loading = ref(false)
const displayMode = ref('list')

const employees = ref([
  { id: 1, full_name: 'Aliyev Anvar', position: 'Direktor', department: 'Boshqaruv', phone: '+998901234567', branch: 'Markaziy filial' },
  { id: 2, full_name: 'Karimova Nodira', position: 'O‘qituvchi', department: 'O‘quv bo‘limi', phone: '+998901112233', branch: 'Yunusobod filial' },
  { id: 3, full_name: 'Rustamov Diyor', position: 'Hisobchi', department: 'Buxgalteriya', phone: '+998909876543', branch: 'Markaziy filial' },
])

const columns = [
  { key: 'index', label: '#' },
  { key: 'full_name', label: 'Xodim Nomi' },
  { key: 'position', label: 'Lavozim' },
  { key: 'department', label: 'Bo\'lim' },
  { key: 'phone', label: 'Mobil raqam' },
  { key: 'branch', label: 'Filial' },
]

const sortField = ref('full_name')
const sortDirection = ref('asc')

function sort(key) {
  if (sortField.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = key
    sortDirection.value = 'asc'
  }
}

const sortedEmployees = computed(() => {
  let arr = [...employees.value]
  if (sortField.value !== 'index') {
    arr.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  // Filter by search
  if (filters.value.search) {
    arr = arr.filter(e =>
      e.full_name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      e.position.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      e.phone.includes(filters.value.search)
    )
  }
  // Filter by branch, position, department
  if (filters.value.branch_id) arr = arr.filter(e => e.branch === branchOptions.value[filters.value.branch_id])
  if (filters.value.position_id) arr = arr.filter(e => e.position === positionOptions.value[filters.value.position_id])
  if (filters.value.department_id) arr = arr.filter(e => e.department === departmentOptions.value[filters.value.department_id])
  return arr
})

function onAddEmployee() {
  alert("Xodim qo'shish")
}
function searchEmployees() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 1000)
}
function editEmployee(employee) {
  alert('Tahrirlash: ' + employee.full_name)
}
function confirmDelete(employee) {
  if (employee) {
    employees.value = employees.value.filter(e => e.id !== employee.id)
  }
}
</script>
