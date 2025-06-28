<template>
  <div class="flex flex-col h-full mt-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-4 mx-4" />
    <form @submit.prevent="submitForm" class="mx-4">
      <!-- Tepa qism -->
      <div class="flex-1 bg-white p-4 rounded-md shadow">
        <h2 class="text-lg font-bold text-gray-800 mb-4 bg-gray-100 py-4 px-4">O'quvchi Ma'lumotlari</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Qabul qilinganlik raqami -->
          <div>
            <label for="passport_number" class="block text-sm font-medium text-gray-700">Metirka/Pasport raqami</label>
            <input v-model="form.passport_number" type="text" id="passport_number" name="passport_number"
              placeholder="YY00000"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
            <!-- Error message here -->
          </div>
          <!-- Filial -->
          <div>
            <label for="branch_id" class="block text-sm font-medium text-gray-700">Filial</label>
            <select v-model="form.branch_id" id="branch" name="branch"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3">
              <option value="">Filialni tanlang</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
            <!-- Error message here -->
          </div>

          <!-- Guruhlarni tanlang -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Guruhlar</label>
            <div class="relative" @click.outside="dropdownOpen = false">
              <button @click="dropdownOpen = !dropdownOpen" type="button"
                class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <span class="block truncate">{{ selectedGroupNames }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
              <div v-if="dropdownOpen"
                class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <div class="px-2 py-2">
                  <div v-for="group in groups" :key="group.id"
                    class="flex items-center px-2 py-2 rounded-md cursor-pointer transition-colors duration-150 ease-in-out"
                    :class="{ 'bg-blue-50': form.group_ids.includes(group.id), 'hover:bg-gray-100': !form.group_ids.includes(group.id) }">
                    <input type="checkbox" :id="'group_' + group.id" v-model="form.group_ids" :value="group.id"
                      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label :for="'group_' + group.id"
                      class="ml-3 block text-sm w-full cursor-pointer"
                      :class="{ 'text-blue-600 font-medium': form.group_ids.includes(group.id), 'text-gray-700': !form.group_ids.includes(group.id) }">
                      {{ group.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- Error message here -->
          </div>
          <!-- Ism -->
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-700">Ism</label>
            <input v-model="form.first_name" type="text" id="first_name" name="first_name" placeholder="Ism kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
            <!-- Error message here -->
          </div>
          <!-- Familiya -->
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-700">Familiya</label>
            <input v-model="form.last_name" type="text" id="last_name" name="last_name" placeholder="Familiya kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
            <!-- Error message here -->
          </div>
          <!-- Jinsi -->
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">Jinsi</label>
            <select v-model="form.gender" id="gender" name="gender"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3">
              <option value="">Jinsni tanlang</option>
              <option value="male">Erkak</option>
              <option value="female">Ayol</option>
            </select>
            <!-- Error message here -->
          </div>
          <!-- Tug'ilgan yili -->
          <div>
            <label for="birth_date" class="block text-sm font-medium text-gray-700">Tug'ilgan yili</label>
            <input v-model="form.birth_date" type="date" id="birth_date" name="birth_date"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
            <!-- Error message here -->
          </div>
          <!-- Telefon raqami -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Telefon raqami</label>
            <input v-model="form.phone" type="number" id="phone" name="phone" placeholder="Telefon kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
            <!-- Error message here -->
          </div>
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" id="email" name="email" placeholder="Email kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
            <!-- Error message here -->
          </div>
          <!-- O'quvchi statusi -->
          <div>
            <label for="studentStatus" class="block text-sm font-medium text-gray-700">O'quvchi oilaviy holati</label>
            <div class="mt-2 flex items-center gap-6">
              <label class="inline-flex items-center">
                <input type="radio" v-model="form.status_id" name="status_id" value="1" @click="showNote = true"
                  class="form-radio text-blue-600">
                <span class="ml-2">Ha</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="form.status_id" name="status_id" value="0" @click="showNote = false"
                  class="form-radio text-blue-600">
                <span class="ml-2">Yo‘q</span>
              </label>
              <div v-if="showNote" class="mt-3 w-full">
                <textarea id="notes" rows="3" style="min-width: 400px; width: 100%; max-width: 100%;"
                  class="mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3"
                  placeholder="Izoh kiriting..."></textarea>
              </div>
            </div>
            <!-- Error message here -->
          </div>
        </div>
      </div>
      <!-- Ota-onalar Ma'lumotlari -->
      <div class="bg-white p-4 rounded-md shadow-sm mt-4 border">
        <h2 class="text-lg font-bold text-gray-800 mb-4 bg-gray-100 py-4 px-4">
          Ota-onalar Ma'lumotlari
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Ota yoki onaning ismi -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Ota yoki Onasini ismi</label>
            <input v-model="parent.parentsName" type="text" placeholder="Ism kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
          </div>

          <!-- Telefon raqami -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Ota yoki Onasini telefoni</label>
            <input v-model="parent.parentsPhone" type="text" placeholder="Telefon kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Ota yoki Onasini Email</label>
            <input v-model="parent.parentsEmail" type="email" placeholder="Email kiriting"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-3" />
          </div>
        </div>
      </div>

      <!-- Tugmalar -->
      <div class="flex justify-end items-center gap-4 mt-6">
        <button type="submit"
          class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
          Qo'shish
        </button>
        <button type="button" @click="submitAndReset"
          class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white focus:outline-none">
          Qo'shish & Yana Qo'shish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const form = ref({
  passport_number: '',
  branch_id: '',
  group_ids: [],
  first_name: '',
  last_name: '',
  gender: '',
  birth_date: '',
  phone: '',
  email: '',
  status_id: '0',
  notes: ''
})

const parent = ref({
  parentsName: '',
  parentsPhone: '',
  parentsEmail: ''
})

const branches = ref([
  { id: 1, name: 'Filial 1' },
  { id: 2, name: 'Filial 2' }
])

const groups = ref([
  { id: 1, name: 'Guruh A' },
  { id: 2, name: 'Guruh B' }
])

const dropdownOpen = ref(false)
const showNote = ref(false)

const selectedGroupNames = computed(() => {
  if (form.value.group_ids.length === 0) {
    return 'Guruhlarni tanlang'
  }
  return groups.value
    .filter(group => form.value.group_ids.includes(group.id))
    .map(group => group.name)
    .join(', ')
})

const breadcrumbItems = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: "O'quvchi qo'shish", to: '/students/add', active: true }
]);

function submitForm() {
  console.log('Form:', form.value, parent.value)
  // API chaqiruv joyi
}

function submitAndReset() {
  submitForm()
  form.value = {
    passport_number: '',
    branch_id: '',
    group_ids: [],
    first_name: '',
    last_name: '',
    gender: '',
    birth_date: '',
    phone: '',
    email: '',
    status_id: '0',
    notes: ''
  }
  parent.value = {
    parentsName: '',
    parentsPhone: '',
    parentsEmail: ''
  }
  showNote.value = false
}
</script>

<style scoped>
</style>
