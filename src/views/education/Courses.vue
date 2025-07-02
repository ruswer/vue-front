<template>
  <div class="mx-4 my-6">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
      <!-- Left panel: Add/Edit Course -->
      <div class="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-shrink-0">
        <CourseForm
          :course-to-edit="editingCourse"
          :is-saving="isSaving"
          @save="saveCourse"
          @cancel="cancelEdit"
        />
      </div>
      <!-- Right panel: Courses Table -->
      <div class="w-full lg:w-[70%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <CourseTable
          :courses="paginatedCourses"
          :search="search"
          :sort-field="sortField"
          @update:search="search = $event"
          @sort-by="sortBy"
          @edit="openEditForm"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import CourseForm from '@/components/education/courses/CourseForm.vue'
import CourseTable from '@/components/education/courses/CourseTable.vue'

const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Ta'lim", to: '/education/courses' },
  { text: 'Kurslar', to: '/education/courses', active: true }
]

const courses = ref([
  { id: 1, name: 'English', description: 'ingliz tili darsi', status: 'active' },
  { id: 2, name: 'Frontend', description: 'dasturlash kursi', status: 'active' },
  { id: 3, name: 'koko', description: 'darslar kolleksiyasi', status: 'inactive' },
]);

const isSaving = ref(false);
const editingCourse = ref(null);

const search = ref('');
const sortField = ref('name');
const sortDirection = ref('asc');

const filteredCourses = computed(() => {
  let result = courses.value;
  if (search.value) {
    const s = search.value.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(s) ||
      (c.description && c.description.toLowerCase().includes(s))
    );
  }
  if (sortField.value) {
    result = result.slice().sort((a, b) => {
      const fieldA = a[sortField.value];
      const fieldB = b[sortField.value];
      if (fieldA < fieldB) return sortDirection.value === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return result;
});

const paginatedCourses = computed(() => filteredCourses.value); // No real pagination

function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
}

function saveCourse(courseData) {
  isSaving.value = true;
  setTimeout(() => {
    if (courseData.id) {
      const index = courses.value.findIndex(c => c.id === courseData.id);
      if (index !== -1) {
        courses.value[index] = { ...courseData };
      }
    } else {
      const newId = courses.value.length ? Math.max(...courses.value.map(c => c.id)) + 1 : 1;
      courses.value.push({ ...courseData, id: newId });
    }
    isSaving.value = false;
    cancelEdit();
  }, 500);
}

function openEditForm(course) {
  editingCourse.value = { ...course };
}

function cancelEdit() {
  editingCourse.value = null;
}
</script>

<style scoped>
</style>
