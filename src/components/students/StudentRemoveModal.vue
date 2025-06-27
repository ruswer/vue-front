<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[1999] overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        @click="$emit('close')"
      ></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl"
      >
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
            Studentni Safdan Chiqarish
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 space-y-4">
          <p class="text-sm text-gray-600">
            Haqiqatan ham <strong>{{ studentName || 'tanlangan student' }}</strong>ni safdan chiqarmoqchimisiz? Iltimos, sababini tanlang:
          </p>
          <div>
            <label for="removal_reason_id_list" class="block text-sm font-medium text-gray-700 sr-only">
              Safdan chiqarish sababi
            </label>
            <select
              v-model="removalReasonId"
              id="removal_reason_id_list"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': removalReasonError }"
            >
              <option value="">Sababni tanlang...</option>
              <option v-for="(name, id) in removalReasonsOptions" :key="id" :value="id">
                {{ name }}
              </option>
            </select>
            <p v-if="removalReasonError" class="mt-2 text-sm text-red-600">{{ removalReasonError }}</p>
          </div>
        </div>
        <div class="pt-5 mt-6 border-t border-gray-200 sm:flex sm:flex-row-reverse">
          <button
            @click="$emit('remove-student')"
            :disabled="isRemoving"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            :class="{ 'opacity-75 cursor-wait': isRemoving }"
          >
            <svg v-if="isRemoving" class="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="isRemoving">Bajarilmoqda...</span>
            <span v-else>Safdan Chiqarish</span>
          </button>
          <button
            @click="$emit('close')"
            :disabled="isRemoving"
            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentRemoveModal',
  props: {
    show: Boolean,
    studentName: String,
    removalReasonId: String,
    removalReasonError: String,
    removalReasonsOptions: Object,
    isRemoving: Boolean
  },
  emits: ['close', 'remove-student'],
  watch: {
    removalReasonId(newVal) {
      this.$emit('update:removalReasonId', newVal);
    }
  }
};
</script>
