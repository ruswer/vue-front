<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <TimetableFilters
      :filters="filters"
      :branch-options="branchOptions"
      :group-options="groupOptions"
      :teacher-options="teacherOptions"
      :loading="loading"
      @search-schedule="searchSchedule"
      @add-schedule="onAddSchedule"
    />
    <TimetableTable
      :week-days="weekDays"
      :time-slots="timeSlots"
      :get-schedule-for-time-and-day="getScheduleForTimeAndDay"
      :cabinets="cabinets"
      :selected-cabinet-id="selectedCabinetId"
      :get-schedule-count-for-cabinet="getScheduleCountForCabinet"
      @filter-by-room="filterByRoom"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import TimetableFilters from '@/components/hr/employee/TimetableFilters.vue'
import TimetableTable from '@/components/hr/employee/TimetableTable.vue'

const breadcrumbs = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Ta'lim", to: '/education' },
  { text: 'Dars jadvali', to: '/education/timetable', active:true }
]

const branchOptions = ref({
  1: 'Markaziy filial',
  2: 'Yunusobod filial',
})
const groupOptions = ref({
  1: '9A',
  2: '9B',
  3: '10A',
})
const teacherOptions = ref({
  1: 'Aliyev A.',
  2: 'Karimova N.',
  3: 'Rustamov D.',
})
const cabinets = ref([
  { id: 1, name: '101-xona' },
  { id: 2, name: '102-xona' },
  { id: 3, name: '103-xona' },
])
const weekDays = ref([
  { dayNum: 1, short: 'Du', date: '10.06' },
  { dayNum: 2, short: 'Se', date: '11.06' },
  { dayNum: 3, short: 'Ch', date: '12.06' },
  { dayNum: 4, short: 'Pa', date: '13.06' },
  { dayNum: 5, short: 'Ju', date: '14.06' },
  { dayNum: 6, short: 'Sh', date: '15.06' },
])
const timeSlots = ref(['08:00', '09:00', '10:00', '11:00', '12:00'])

const filters = ref({
  branch_id: '',
  group_id: '',
  teacher_id: '',
})
const selectedCabinetId = ref(null)
const loading = ref(false)

const schedules = ref([
  {
    time: '08:00',
    dayNum: 1,
    group: { name: '9A' },
    teacher: { full_name: 'Aliyev A.' },
    cabinet: { id: 1, name: '101-xona' },
  },
  {
    time: '09:00',
    dayNum: 2,
    group: { name: '10A' },
    teacher: { full_name: 'Karimova N.' },
    cabinet: { id: 2, name: '102-xona' },
  },
  {
    time: '10:00',
    dayNum: 3,
    group: { name: '9B' },
    teacher: { full_name: 'Rustamov D.' },
    cabinet: { id: 1, name: '101-xona' },
  },
])

function onAddSchedule() {
  alert("Dars Jadvali qo'shish/Yangilash")
}

function searchSchedule() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    // Bu yerda backenddan jadvalni filterlab olish mumkin
  }, 1000)
}

function filterByRoom(cabinetId) {
  selectedCabinetId.value = cabinetId
}

function getScheduleCountForCabinet(cabinetId) {
  return schedules.value.filter(s => s.cabinet.id === cabinetId).length
}

function getScheduleForTimeAndDay(time, dayNum) {
  let filtered = schedules.value.filter(s =>
    s.time === time &&
    s.dayNum === dayNum &&
    (selectedCabinetId.value ? s.cabinet.id === selectedCabinetId.value : true)
  )
  return filtered.length ? filtered[0] : null
}
</script>
