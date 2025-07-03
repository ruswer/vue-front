<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6"
        style="background-color: rgba(0,0,0,0.5);"
    >
        <div
            class="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800"
        >
            <div class="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                    To'lov qo'shish ({{ staffForPayment?.full_name }})
                </h3>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form @submit.prevent="savePayment" class="mt-4 space-y-4">
                <div>
                    <label for="paymentAmount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Summa</label>
                    <input v-model="payment.amount" type="number" step="any" id="paymentAmount" required
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                </div>
                <div>
                    <label for="paymentDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sana</label>
                    <input v-model="payment.date" type="date" id="paymentDate" required
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           onclick="this.showPicker();">
                </div>
                <div>
                    <label for="paymentComment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Izoh</label>
                    <textarea v-model="payment.comment" id="paymentComment" rows="3"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                </div>

                <div class="mt-6 flex justify-end gap-x-3">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                    >
                        Bekor qilish
                    </button>
                    <button
                        type="submit"
                        class="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
                    >
                        Saqlash
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    show: Boolean,
    staffForPayment: Object,
});

const emit = defineEmits(['close', 'save-payment']);

const payment = ref({
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    comment: '',
});

watch(() => props.show, (newVal) => {
    if (newVal) {
        payment.value = {
            amount: '',
            date: new Date().toISOString().slice(0, 10),
            comment: '',
        };
    }
});

const savePayment = () => {
    emit('save-payment', { ...payment.value, staff_id: props.staffForPayment.id });
};
</script>