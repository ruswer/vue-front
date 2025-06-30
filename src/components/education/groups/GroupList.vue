<template>
  <div class="w-full lg:w-[70%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Guruhlar ro'yxati</h2>

    <!-- Status filterlari -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
      <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-1">
        <button type="button" @click="updateStatus('active')"
                :class="{ 'bg-green-600 shadow-sm text-white': selectedStatus === 'active', 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300': selectedStatus !== 'active' }"
                class="inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Faol
        </button>
        <button type="button" @click="updateStatus('waiting')"
                :class="{ 'bg-gray-500 shadow-sm text-white': selectedStatus === 'waiting', 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300': selectedStatus !== 'waiting' }"
                class="inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Kutilmoqda
        </button>
        <button type="button" @click="updateStatus('deleted')"
                :class="{ 'bg-red-600 shadow-sm text-white': selectedStatus === 'deleted', 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300': selectedStatus !== 'deleted' }"
                class="inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          O'chirilgan
        </button>
      </div>
    </div>

    <!-- Jadval -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm whitespace-nowrap">
        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="updateSort('name')">
              <div class="flex items-center gap-x-1">
                <span>Guruh</span>
                <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="name" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="updateSort('teacher_id')">
              <div class="flex items-center gap-x-1">
                <span>O'qituvchi</span>
                <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="teacher_id" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="updateSort('students_count')">
              <div class="flex items-center gap-x-1">
                <span>O'quvchilar soni</span>
                <SortIcon :sort-field="sortField" :sort-direction="sortDirection" field="students_count" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody class="dark:text-gray-200">
          <tr v-for="group in groups" :key="group.id" class="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4">{{ group.name }}</td>
            <td class="px-6 py-4">{{ getTeacherName(group.teacher_id) }}</td>
            <td class="px-6 py-4">{{ group.students_count }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end items-center gap-2">
                <template v-if="selectedStatus === 'deleted'">
                  <button type="button" @click="$emit('restore', group.id)" title="Tiklash" class="text-yellow-500 hover:text-yellow-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
                  <button type="button" @click="$emit('force-delete', group.id)" title="Butunlay o'chirish" class="text-red-600 hover:text-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </template>
                <template v-else>
                  <button type="button" @click="$emit('edit', group)" title="Tahrirlash" class="text-blue-600 hover:text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.796a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button type="button" @click="$emit('delete', group.id)" title="O'chirish (Arxiv)" class="text-red-600 hover:text-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="groups.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
              {{ emptyStateMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginatsiya -->
    <div class="mt-4 flex justify-between items-center">
        <span class="text-sm text-gray-700 dark:text-gray-400">
            Jami {{ totalItems }} ta guruhdan {{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(currentPage * perPage, totalItems) }} gacha ko'rsatilmoqda
        </span>
        <div class="inline-flex -space-x-px rounded-md shadow-sm">
            <button @click="$emit('update:currentPage', currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 disabled:opacity-50">
                <span class="sr-only">Oldingi</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
            </button>
            <button @click="$emit('update:currentPage', currentPage + 1)" :disabled="currentPage === totalPages" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 disabled:opacity-50">
                <span class="sr-only">Keyingi</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import SortIcon from './SortIcon.vue'; // We will create this component next

const props = defineProps({
  groups: Array,
  teachers: Array,
  selectedStatus: String,
  sortField: String,
  sortDirection: String,
  currentPage: Number,
  perPage: Number,
  totalItems: Number,
});

const emit = defineEmits(['update:selectedStatus', 'update:sortField', 'update:sortDirection', 'update:currentPage', 'edit', 'delete', 'restore', 'force-delete']);

const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.perPage);
});

const emptyStateMessage = computed(() => {
  switch (props.selectedStatus) {
    case 'deleted': return "O'chirilgan guruhlar topilmadi.";
    case 'waiting': return "Kutilayotgan guruhlar topilmadi.";
    default: return "Faol guruhlar topilmadi.";
  }
});

function getTeacherName(teacherId) {
  const teacher = props.teachers.find(t => t.id === teacherId);
  return teacher ? teacher.fullName : 'N/A';
}

function updateStatus(status) {
  emit('update:selectedStatus', status);
}

function updateSort(field) {
  emit('update:sortField', field);
}
</script>