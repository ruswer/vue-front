<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <DepartmentForm
        :form="form"
        :formError="formError"
        :loading="loading"
        @submit="createDepartment"
      />
      <DepartmentTable
        :departments="departments"
        :search="search"
        :sortField="sortField"
        :sortDirection="sortDirection"
        @edit="editDepartment"
        @delete="deleteDepartment"
        @sort-by="sortBy"
        @update:search="val => search = val"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import DepartmentForm from '../../components/hr/Department/DepartmentForm.vue';
import DepartmentTable from '../../components/hr/Department/DepartmentTable.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: "Kadrlar bo'limi" },
  { text: 'Bo\'limlar', to: '/hr/department', active: true }
]);

const form = ref({ name: '' });
const formError = ref('');
const loading = ref(false);
const search = ref('');
const sortField = ref('name');
const sortDirection = ref('asc');

const departments = ref([
  { id: 1, name: "IT bo'limi" },
  { id: 2, name: "Buxgalteriya" },
  { id: 3, name: "Kadrlar" },
]);

function createDepartment() {
  formError.value = '';
  if (!form.value.name.trim()) {
    formError.value = "Bo'lim nomi majburiy";
    return;
  }
  loading.value = true;
  setTimeout(() => {
    departments.value.push({ id: Date.now(), name: form.value.name });
    form.value.name = '';
    loading.value = false;
  }, 800);
}

function editDepartment(department) {
  alert(`Tahrirlash: ${department.name}`);
}

function deleteDepartment(department) {
  if (confirm(`O'chirish: ${department.name}?`)) {
    departments.value = departments.value.filter(dep => dep.id !== department.id);
  }
}

function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
}
</script>