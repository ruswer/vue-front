<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />

    <div class="flex flex-col lg:flex-row lg:items-start gap-4 mt-4">
      <!-- Chap panel -->
      <CabinetForm
        class="lg:w-1/3"
        :cabinet="editingCabinet"
        :is-saving="isSaving"
        @save="saveCabinet"
        @cancel="cancelEdit"
      />

      <!-- O'ng panel -->
      <CabinetTable
        class="lg:w-2/3"
        :cabinets="filteredCabinets"
        v-model:searchQuery="searchQuery"
        :sort-key="sortKey"
        :sort-order="sortOrder"
        @sort="sortBy"
        @edit="editCabinet"
        @delete="confirmDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import CabinetForm from '@/components/education/cabinets/CabinetForm.vue';
import CabinetTable from '@/components/education/cabinets/CabinetTable.vue';

const breadcrumbs = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Ta\'lim', to: '/education' },
  { text: 'Kabinetlar', to: '/education/cabinets', active: true },
];

// --- State ---
const cabinets = ref([
  { id: 1, name: '101-xona' },
  { id: 2, name: '102-xona' },
  { id: 3, name: 'Kompyuter xonasi' },
]);

const isSaving = ref(false);
const editingCabinet = ref({ id: null, name: '' });
const searchQuery = ref('');
const sortKey = ref('name');
const sortOrder = ref('asc');

// --- Computed ---
const filteredCabinets = computed(() => {
  let filtered = cabinets.value;
  if (searchQuery.value) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  filtered.sort((a, b) => {
    let modifier = sortOrder.value === 'asc' ? 1 : -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
    return 0;
  });
  return filtered;
});

// --- Methods ---
function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

function saveCabinet(cabinetData) {
  isSaving.value = true;
  // Simulate API call
  setTimeout(() => {
    if (cabinetData.id) {
      // Update
      const index = cabinets.value.findIndex(c => c.id === cabinetData.id);
      if (index !== -1) {
        cabinets.value[index] = { ...cabinetData };
      }
    } else {
      // Create
      const newId = cabinets.value.length > 0 ? Math.max(...cabinets.value.map(c => c.id)) + 1 : 1;
      cabinets.value.push({ id: newId, name: cabinetData.name });
    }
    cancelEdit();
    isSaving.value = false;
  }, 500);
}

function editCabinet(cabinet) {
  editingCabinet.value = { ...cabinet };
}

function cancelEdit() {
  editingCabinet.value = { id: null, name: '' };
}

function confirmDelete(cabinet) {
  if (cabinet) {
    cabinets.value = cabinets.value.filter(c => c.id !== cabinet.id);
  }
}
</script>