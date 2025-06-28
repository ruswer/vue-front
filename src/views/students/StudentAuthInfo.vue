<template>
  <div class="flex flex-col h-full mt-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-4 mx-4" />

    <!-- Filter Section -->
    <div class="mx-4">
      <AuthInfoFilter
        :branches="branches"
        :groups="groups"
        :selectedBranch="selectedBranch"
        :selectedGroup="selectedGroup"
        :loading="loading"
        @filter="onFilter"
        @update:selectedBranch="val => selectedBranch = val"
        @update:selectedGroup="val => selectedGroup = val"
        @searchByFilters="searchByFilters"
      />
    </div>

    <!-- Content Section -->
    <div class="flex-1 mt-4 bg-white rounded-md shadow-sm p-4 mx-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Saytga kirish ma'lumotlari</h2>
      <!-- Search Input -->
      <div class="mb-4">
        <input
          type="text"
          v-model="search"
          @input="debounceSearchByKeyword"
          placeholder="O'quvchi, login yoki ota-ona..."
          class="block w-full md:w-1/5 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <AuthInfoTable
        :students="students"
        :columns="columns"
        :sortField="sortField"
        :sortDirection="sortDirection"
        :isLoading="loading"
        :isFilterActive="isFilterActive"
        :isSearchActive="isSearchActive"
        @sort="sort"
        @resetFilters="resetFilters"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import AuthInfoFilter from '@/components/authinfo/AuthInfoFilter.vue'
import AuthInfoTable from '@/components/authinfo/AuthInfoTable.vue'

const selectedBranch = ref('')
const selectedGroup = ref('')
const search = ref('')
const loading = ref(false)
const branches = ref([])
const groups = ref([])
const students = ref([])
const sortField = ref('first_name')
const sortDirection = ref('asc')
const columns = ref({
  first_name: "O'quvchi Ismi",
  login: 'Login',
  password: 'Parol',
  parent_login: "Ota-ona login",
  parent_password: "Ota-ona parol"
})
const isFilterActive = computed(() => !!selectedBranch.value || !!selectedGroup.value)
const isSearchActive = computed(() => !!search.value)

const fetchData = async () => {
  loading.value = true
  // API orqali filial, guruh, studentlarni yuklash
  // Demo uchun mock data:
  students.value = [
    { id: 1, first_name: 'Ali', last_name: 'Valiyev', authorization: { login: 'ali01' }, parents: [{ authorization: { login: 'vali01' } }] },
    { id: 2, first_name: 'Omina', last_name: 'Hasanova', authorization: { login: 'omina02' }, parents: [{ authorization: { login: 'hasan02' } }] }
  ]
  loading.value = false
}

onMounted(fetchData)

const onFilter = async (branch, group) => {
  selectedBranch.value = branch
  selectedGroup.value = group
  loading.value = true
  // Tanlangan branch va group bo'yicha filter qilinadi
  loading.value = false
}
const sort = (column) => {
  if (sortField.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = column
    sortDirection.value = 'asc'
  }
  // fetchData() yoki local sort
}
const resetFilters = () => {
  selectedBranch.value = ''
  selectedGroup.value = ''
  search.value = ''
  // fetchData()
}
const searchByFilters = () => {
  // fetchData()
}
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Avtorizatsiya ma'lumotlari", to: '/students/auth-info', active: true }
]
</script>

<style scoped>
</style>
