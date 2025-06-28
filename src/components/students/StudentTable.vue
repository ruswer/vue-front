<template>
  <div class="overflow-x-auto bg-white">
    <table class="min-w-full text-left text-sm whitespace-nowrap">
      <thead class="uppercase tracking-wider border-b-2 text-gray-800 bg-gray-100">
        <tr>
          <th class="p-px">
            <div class="px-6 py-4">O'quvchi</div>
          </th>
          <th v-for="(label, column) in columns" :key="column" class="p-px">
            <div class="px-6 py-4 hover:bg-gray-100 cursor-pointer select-none" @click="$emit('sort', column)">
              {{ label }}
              <svg
                class="w-[0.75rem] h-[0.75rem] inline ml-1 text-neutral-500 mb-[1px]"
                :class="{ 'rotate-180': sortField === column && sortDirection === 'asc' }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128z" />
              </svg>
            </div>
          </th>
          <th class="p-px">
            <div class="px-6 py-4">Tahrirlash</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!students.length">
          <td :colspan="Object.keys(columns).length + 2">
            <slot name="empty"></slot>
          </td>
        </tr>
        <tr v-else v-for="student in students" :key="student.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4">
            <div class="flex items-center space-x-3">
              <img
                v-if="student.avatar"
                :src="student.avatar"
                alt="avatar"
                class="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <div v-else class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <a
                href="#"
                @click.prevent="$emit('show-student-profile', student.id)"
                class="text-blue-600 hover:text-blue-900 hover:underline"
              >
                {{ student.first_name }} {{ student.last_name }}
              </a>
            </div>
          </td>
          <td class="px-6 py-4">{{ student.branch?.name || '-' }}</td>
          <td class="px-6 py-4">{{ student.status?.name || '-' }}</td>
          <td class="px-6 py-4">{{ student.courses?.[0]?.name || '-' }}</td>
          <td class="px-6 py-4">{{ student.groups?.map(g => g.name).join(', ') || '-' }}</td>
          <td class="px-6 py-4">{{ student.phone || '-' }}</td>
          <td class="px-6 py-4">{{ student.studyLanguagesStudents?.map(l => l.language).join(', ') || '-' }}</td>
          <td class="px-6 py-4">{{ student.knowledgeLevel?.name || '-' }}</td>
          <td class="px-6 py-4">{{ student.studyDays?.map(d => d.day).join('/') || '-' }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center space-x-2">
              <a
                href="#"
                @click.prevent="$emit('edit-student', student.id)"
                class="text-blue-600 hover:text-blue-900"
                title="Tahrirlash"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L9.38 17.273a4.5 4.5 0 01-1.897 1.13l-2.745.823.823-2.745a4.5 4.5 0 011.13-1.897l10.171-10.17z" />
                </svg>
              </a>
              <button
                @click="$emit('open-remove-student-modal', student.id, `${student.first_name} ${student.last_name}`)"
                class="text-red-600 hover:text-red-900"
                title="Safdan chiqarish"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StudentTable',
  props: {
    students: Array,
    columns: Object,
    sortField: String,
    sortDirection: String
  }
};
</script>
