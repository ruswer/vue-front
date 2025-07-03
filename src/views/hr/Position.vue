<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <PositionForm
        :form="form"
        :formError="formError"
        :loading="loading"
        @submit="createPosition"
      />
      <PositionTable
        :positions="positions"
        :search="search"
        :sortField="sortField"
        :sortDirection="sortDirection"
        @edit="editPosition"
        @delete="deletePosition"
        @sort-by="sortBy"
        @update:search="val => search = val"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import PositionForm from '../../components/hr/position/PositionForm.vue';
import PositionTable from '../../components/hr/position/PositionTable.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: "Kadrlar bo'limi" },
  { text: 'Lavozimlar', to: '/hr/position', active: true }
]);

const form = ref({ name: '' });
const formError = ref('');
const loading = ref(false);
const search = ref('');
const sortField = ref('name');
const sortDirection = ref('asc');

const positions = ref([
  { id: 1, name: "Direktor" },
  { id: 2, name: "Bosh hisobchi" },
  { id: 3, name: "Kadrlar bo'limi boshlig'i" }
]);

function createPosition() {
  formError.value = '';
  if (!form.value.name.trim()) {
    formError.value = "Lavozim nomi majburiy";
    return;
  }
  loading.value = true;
  setTimeout(() => {
    positions.value.push({ id: Date.now(), name: form.value.name });
    form.value.name = '';
    loading.value = false;
  }, 800);
}

function editPosition(position) {
  alert(`Tahrirlash: ${position.name}`);
}

function deletePosition(position) {
  if (confirm(`O'chirish: ${position.name}?`)) {
    positions.value = positions.value.filter(pos => pos.id !== position.id);
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
