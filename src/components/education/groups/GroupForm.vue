<template>
  <div class="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-shrink-0">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">
      {{ groupToEdit ? "Guruhni tahrirlash" : "Guruh qo'shish" }}
    </h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      
      <!-- Guruh nomi -->
      <div>
        <label for="name" class="form-label">Guruh nomi</label>
        <input type="text" id="name" v-model="form.name" required class="form-input" />
      </div>

      <!-- Filial -->
      <div>
        <label for="branch_id" class="form-label">Filial</label>
        <select id="branch_id" v-model="form.branch_id" required class="form-select">
          <option disabled value="">Filialni tanlang</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
        </select>
      </div>

      <!-- Guruh holati -->
      <div>
        <label for="status" class="form-label">Guruh holati</label>
        <select id="status" v-model="form.status" required class="form-select">
          <option value="active">Faol</option>
          <option value="waiting">Kutilmoqda</option>
        </select>
      </div>

      <!-- Kurs -->
      <div>
        <label for="course_id" class="form-label">Kurs</label>
        <select id="course_id" v-model="form.course_id" required class="form-select">
          <option disabled value="">Kursni tanlang</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
        </select>
      </div>

      <!-- Daraja -->
      <div>
        <label for="knowledge_level_id" class="form-label">Daraja</label>
        <select id="knowledge_level_id" v-model="form.knowledge_level_id" required class="form-select">
          <option disabled value="">Darajani tanlang</option>
          <option v-for="level in knowledgeLevels" :key="level.id" :value="level.id">{{ level.name }}</option>
        </select>
      </div>

      <!-- O'qituvchi -->
      <div>
        <label for="teacher_id" class="form-label">O'qituvchi</label>
        <select id="teacher_id" v-model="form.teacher_id" required class="form-select">
          <option disabled value="">O'qituvchini tanlang</option>
          <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.fullName }}</option>
        </select>
      </div>

      <!-- O'qituvchi maoshi turi -->
      <div>
        <label for="teacher_salary_type" class="form-label">O'qituvchi maoshi turi</label>
        <select id="teacher_salary_type" v-model="form.teacher_salary_type" required class="form-select">
          <option disabled value="">Maosh turini tanlang</option>
          <option v-for="sType in salaryTypes" :key="sType.id" :value="sType.id">{{ sType.name }}</option>
        </select>
      </div>

      <!-- Maosh miqdori -->
      <div>
        <label for="teacher_salary_amount" class="form-label">Maosh miqdori</label>
        <div class="relative">
          <input type="number" id="teacher_salary_amount" v-model.number="form.teacher_salary_amount" required min="0" class="form-input pr-12" />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">UZS</span>
        </div>
      </div>

      <!-- Tarif davri -->
      <div>
        <label for="price_period_months" class="form-label">Tarif davri</label>
        <select id="price_period_months" v-model="form.price_period_months" required class="form-select">
          <option disabled value="">Tarif davrini tanlang</option>
          <option v-for="period in tariffPeriods" :key="period.id" :value="period.id">{{ period.name }}</option>
        </select>
      </div>

      <!-- Kunlar -->
      <div>
        <label class="form-label">Kunlar</label>
        <div class="mt-2 grid grid-cols-2 gap-2">
          <div v-for="day in lessonDayOptions" :key="day.id" class="flex items-center">
            <input :id="'day-' + day.id" :value="day.id" v-model="form.lesson_days" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
            <label :for="'day-' + day.id" class="ml-2 block text-sm text-gray-900 dark:text-gray-200">{{ day.label }}</label>
          </div>
        </div>
      </div>

      <!-- Kurs narxi -->
      <div>
        <label for="total_price" class="form-label">Kurs narxi</label>
        <div class="relative">
          <input type="number" id="total_price" v-model.number="form.total_price" required min="0" class="form-input pr-12" />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">UZS</span>
        </div>
      </div>

      <!-- Darslar soni -->
      <div>
        <label for="lessons_count" class="form-label">Darslar soni</label>
        <input type="number" id="lessons_count" v-model.number="form.lessons_count" required min="1" class="form-input" />
      </div>

      <!-- Bitta dars narxi -->
      <div>
        <label for="price_per_lesson" class="form-label">Bitta dars narxi</label>
        <div class="relative">
          <input type="number" id="price_per_lesson" v-model="form.price_per_lesson" disabled class="form-input pr-12 bg-gray-100 dark:bg-gray-600 cursor-not-allowed" />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">UZS</span>
        </div>
      </div>

      <!-- Dars boshlanish vaqti -->
      <div>
        <label for="lesson_start_time" class="form-label">Dars boshlanish vaqti</label>
        <input type="time" id="lesson_start_time" v-model="form.lesson_start_time" class="form-input" />
      </div>

      <!-- Dars tugash vaqti -->
      <div>
        <label for="lesson_end_time" class="form-label">Dars tugash vaqti</label>
        <input type="time" id="lesson_end_time" v-model="form.lesson_end_time" class="form-input" />
      </div>

      <!-- Amallar -->
      <div class="flex justify-end pt-4">
        <button type="button" v-if="groupToEdit" @click="cancel" class="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-500 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500">
          Bekor qilish
        </button>
        <button type="submit" :disabled="isSaving"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saqlash
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue';

const props = defineProps({
  groupToEdit: {
    type: Object,
    default: null
  },
  isSaving: Boolean,
  branches: Array,
  courses: Array,
  knowledgeLevels: Array,
  teachers: Array,
  salaryTypes: Array,
  tariffPeriods: Array,
  lessonDayOptions: Array,
});

const emit = defineEmits(['save', 'cancel']);

const initialFormState = {
  name: '',
  branch_id: '',
  status: 'waiting',
  course_id: '',
  knowledge_level_id: '',
  teacher_id: '',
  teacher_salary_type: '',
  teacher_salary_amount: 0,
  price_period_months: '',
  lesson_days: [],
  total_price: 0,
  lessons_count: 0,
  price_per_lesson: 0,
  lesson_start_time: '',
  lesson_end_time: '',
};

const form = ref({ ...initialFormState });

watch(() => props.groupToEdit, (newGroup) => {
  if (newGroup) {
    form.value = { ...initialFormState, ...newGroup };
  } else {
    form.value = { ...initialFormState };
  }
}, { immediate: true, deep: true });

watch([() => form.value.total_price, () => form.value.lessons_count], ([totalPrice, lessonsCount]) => {
    if (totalPrice && lessonsCount > 0) {
        form.value.price_per_lesson = Math.round(totalPrice / lessonsCount);
    } else {
        form.value.price_per_lesson = 0;
    }
});

function submitForm() {
  emit('save', form.value);
}

function cancel() {
  emit('cancel');
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300;
}
.form-input, .form-select {
  @apply mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm p-2;
}
</style>