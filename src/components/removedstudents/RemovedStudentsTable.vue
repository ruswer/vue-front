<template>
  <div class="flex-1 mt-4 bg-white rounded-md shadow overflow-x-auto">
    <table class="min-w-full text-left text-sm whitespace-nowrap">
      <thead class="uppercase tracking-wider border-b-2 text-gray-800 bg-gray-100">
        <tr>
          <th v-for="col in columns" :key="col.key" class="p-px">
            <div
              class="px-6 py-4 hover:bg-gray-100 cursor-pointer select-none"
              @click="$emit('sort', col.key)"
            >
              {{ col.label }}
              <svg
                class="w-[0.75rem] h-[0.75rem] inline ml-1 text-neutral-500 mb-[1px]"
                :class="{ 'rotate-180': sortField === col.key && sortDirection === 'asc' }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128z" />
              </svg>
            </div>
          </th>
          <th class="px-6 py-4">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in deletedStudents" :key="student.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4">
            <router-link
              :to="`/students/show/${student.id}`"
              class="text-blue-600 hover:underline cursor-pointer"
            >
              {{ student.first_name }} {{ student.last_name }}
            </router-link>
          </td>
          <td class="px-6 py-4">{{ student.branch?.name ?? '-' }}</td>
          <td class="px-6 py-4">{{ formatDate(student.birth_date) }}</td>
          <td class="px-6 py-4">{{ student.gender === 'male' ? 'Erkak' : 'Ayol' }}</td>
          <td class="px-6 py-4">{{ student.phone }}</td>
          <td class="px-6 py-4">{{ student.removalReason?.name ?? 'Noma\'lum' }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center space-x-2">
              <!-- Pause tugmasi olib tashlandi -->
              <button @click="$emit('open-restore-modal', student)" class="text-green-600 hover:text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </button>
              <!-- Delete tugmasi qo'shildi -->
              <button @click="$emit('force-delete', student)" class="text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination, Modal, etc. goes here -->
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    deletedStudents: Array,
    sortField: String,
    sortDirection: String
  },
  methods: {
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('uz-UZ');
    }
  }
}
</script>
