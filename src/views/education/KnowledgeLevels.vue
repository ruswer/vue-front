<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="flex flex-col lg:flex-row lg:items-start gap-4 mt-4">
      <!-- Chap panel (Bilim darajasi qo'shish/tahrirlash) -->
      <div class="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-shrink-0">
        <LevelForm :level-to-edit="levelToEdit" :is-saving="isSaving" @save="saveLevel" @cancel="clearEditMode" />
      </div>

      <!-- O'ng panel (Bilim darajalari ro'yxati) -->
      <div class="w-full lg:w-[70%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <LevelTable :levels="levels" @edit="editLevel" @delete="deleteLevel" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import LevelForm from '@/components/education/knowledge-levels/LevelForm.vue';
import LevelTable from '@/components/education/knowledge-levels/LevelTable.vue';

const breadcrumbs = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Ta\'lim', to: '/education' },
  { text: 'Bilim darajalari', to: '/education/knowledge-levels', active: true },
];

// --- State Management (Vaqtinchalik ma'lumotlar) ---
const levels = ref([
  { id: 1, name: 'Boshlang\'ich', slug: 'boshlangich', is_active: true },
  { id: 2, name: 'O\'rta', slug: 'orta', is_active: true },
  { id: 3, name: 'Yuqori', slug: 'yuqori', is_active: false },
]);
const levelToEdit = ref(null);
const isSaving = ref(false);

// --- Methods ---
function saveLevel(levelData) {
  isSaving.value = true;
  console.log('Saving level:', levelData);
  // API call logikasi shu yerda bo'ladi
  setTimeout(() => {
    if (levelData.id) {
      // Tahrirlash
      const index = levels.value.findIndex(l => l.id === levelData.id);
      if (index !== -1) {
        levels.value[index] = { ...levels.value[index], ...levelData };
      }
    } else {
      // Yangi qo'shish
      const newId = levels.value.length > 0 ? Math.max(...levels.value.map(l => l.id)) + 1 : 1;
      levels.value.push({ id: newId, ...levelData });
    }
    isSaving.value = false;
    clearEditMode();
  }, 1000);
}

function editLevel(levelId) {
  levelToEdit.value = levels.value.find(l => l.id === levelId) || null;
}

function clearEditMode() {
  levelToEdit.value = null;
}

function deleteLevel(levelId) {
  console.log('Deleting level:', levelId);
  // API call logikasi shu yerda bo'ladi
  levels.value = levels.value.filter(l => l.id !== levelId);
}
</script>