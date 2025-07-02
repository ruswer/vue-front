<template>
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Kurslar ro'yxati</h2>

    <!-- Qidiruv -->
    <div class="mb-4">
      <label for="table-search" class="sr-only">Qidirish</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon icon="heroicons-outline:search" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="table-search"
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          class="block p-3 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Kurs nomi, tavsif bo'yicha..."
        />
      </div>
    </div>

    <!-- Jadval -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm whitespace-nowrap">
        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="$emit('sortBy', 'name')">
              <div class="flex items-center gap-x-1">
                <span>Kurs nomi</span>
                <Icon icon="heroicons-solid:chevron-up-down" class="w-4 h-4" :class="{ 'text-gray-400': sortField !== 'name' }" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <span>Tavsif</span>
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="$emit('sortBy', 'status')">
              <div class="flex items-center gap-x-1">
                <span>Holati</span>
                <Icon icon="heroicons-solid:chevron-up-down" class="w-4 h-4" :class="{ 'text-gray-400': sortField !== 'status' }" />
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="courses.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              Kurslar topilmadi.
            </td>
          </tr>
          <tr v-for="course in courses" :key="course.id" class="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 font-medium">{{ course.name }}</td>
            <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ course.description ? course.description.substring(0, 50) + (course.description.length > 50 ? '...' : '') : '' }}</td>
            <td class="px-6 py-4">
              <span v-if="course.status === 'active'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/50 dark:text-green-400 dark:ring-green-500/20">
                Faol
              </span>
              <span v-else class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/50 dark:text-red-400 dark:ring-red-500/20">
                Faol emas
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end items-center gap-2">
                <button type="button" @click="$emit('edit', course)" title="Tahrirlash" class="text-blue-600 hover:text-blue-900">
                  <Icon icon="heroicons-outline:pencil-alt" class="w-5 h-5" />
                </button>
                <button type="button" @click="$emit('delete', course)" title="O'chirish" class="text-red-600 hover:text-red-900">
                  <Icon icon="heroicons-outline:trash" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginatsiya (kelajakda qo'shilishi mumkin) -->
    <!-- <div class="mt-4">
      PAGINATION_COMPONENT
    </div> -->
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  courses: Array,
  search: String,
  sortField: String,
});

defineEmits(['update:search', 'sortBy', 'edit', 'delete']);
</script>