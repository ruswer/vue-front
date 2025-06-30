<template>
  <div class="flex flex-col h-full mx-4 my-6">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />

    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
      <BranchForm class="lg:w-1/3 w-full" />
      <BranchList :branches="branches" class="lg:w-2/3 w-full" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import BranchForm from '@/components/education/branches/BranchForm.vue';
import BranchList from '@/components/education/branches/BranchList.vue';

const breadcrumbItems = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: "Ta'lim", to: '#' },
  { text: "Filiallar", to: '/education/branches', active: true }
]);

// Dummy data for now
const branches = ref([
    { id: 1, name: 'Markaziy filial', address: 'Toshkent sh., Amir Temur ko\'chasi, 100' },
    { id: 2, name: 'Yunusobod filiali', address: 'Toshkent sh., Yunusobod tumani, 5-kvartal' }
]);

</script>