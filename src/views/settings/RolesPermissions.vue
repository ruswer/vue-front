<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <RoleForm
        :form="form"
        :formError="formError"
        :loading="loading"
        @submit="createRole"
      />
      <RoleTable
        :roles="roles"
        :search="search"
        :sortField="sortField"
        :sortDirection="sortDirection"
        @assign-permissions="assignPermissions"
        @edit="editRole"
        @delete="deleteRole"
        @sort-by="sortBy"
        @update:search="val => search = val"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import RoleForm from '../../components/settings/rolespermissions/RoleForm.vue';
import RoleTable from '../../components/settings/rolespermissions/RoleTable.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Tizimni sozlash' },
  { text: 'Rollar va ruxsatlar', to: '/settings/roles-permissions', active: true }
]);

const form = ref({ name: '' });
const formError = ref('');
const loading = ref(false);
const search = ref('');
const sortField = ref('name');
const sortDirection = ref('asc');

const roles = ref([
  { id: 1, name: "Admin" },
  { id: 2, name: "O'qituvchi" },
  { id: 3, name: "Operator" }
]);

function createRole() {
  formError.value = '';
  if (!form.value.name.trim()) {
    formError.value = "Rol nomi majburiy";
    return;
  }
  loading.value = true;
  setTimeout(() => {
    roles.value.push({ id: Date.now(), name: form.value.name });
    form.value.name = '';
    loading.value = false;
  }, 800);
}

function assignPermissions(role) {
  alert(`Ruxsatlarni belgilash: ${role.name}`);
}

function editRole(role) {
  alert(`Tahrirlash: ${role.name}`);
}

function deleteRole(role) {
  if (confirm(`O'chirish: ${role.name}?`)) {
    roles.value = roles.value.filter(r => r.id !== role.id);
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
