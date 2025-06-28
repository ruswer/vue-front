<script>
  let _uid = 0;
  export default {
    props: {
      title: {
        type: String,
        default: "Modal Title",
      },
      subtitle: {
        type: String,
      },
      btnType: {
        type: String,
        default: "submit",
      },
      btnTextSubmit: {
        type: String,
        default: "Submit",
      },
      btnTextClose: {
        type: String,
        default: "Cancel",
      },
      btnColorSubmit: {
        type: String,
        default: "bg-primary",
      },
      backdrop: {
        type: Boolean,
        default: true,
      },
      width: {
        type: String,
        default: "max-w-lg",
      },
      btnColor: {
        type: String,
        default: "bg-primary",
      },
      btnText: {
        type: String,
        default: "Show Modal",
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['submitForm', 'submit', 'close', 'update:isOpen'],
    methods: {
      closeModal() {
        this.$emit('update:isOpen', false);
        this.$emit('close');
      }
    }
  };
</script>

<template>
  <div>
    <teleport to="body">
      <transition name="slide-up">
        <div
          :class="{
            'bg-gray-800/50 ': backdrop,
            'bg-transparent': !backdrop,
          }"
          class="modal-overlay p-5 flex items-center justify-center"
          @click.self="closeModal"
          v-show="isOpen"
        >
          <div
            :class="width"
            class="container mx-auto pt-10"
            style="margin: 0 auto;"
          >
            <form @submit.prevent="$emit('submitForm')">
              <div
                class="modal bg-white border dark:border-gray-600 dark:bg-gray-800 w-full shadow rounded-md"
              >
                <div class="modal-head p-5">
                  <div class="heading flex justify-between">
                    <div>
                      <div>
                        <slot name="Icon" />
                      </div>
                      <div>
                        <h2 class="dark:text-white">{{ title }}</h2>
                        <p class="subtitle">{{ subtitle }}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        class="text-sm text-gray-700"
                        @click="closeModal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="2"
                            d="M6 18L18 6m0 12L6 6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="modal-body dark:text-white">
                  <slot name="body" />
                </div>
                <div class="modal-footer">
                  <div class="flex justify-between">
                    <div class="order-1"></div>
                    <div class="space-x-5 order-2">
                      <button
                        type="button"
                        @click="closeModal"
                        class="px-5 py-2 rounded border dark:border-gray-600 dark:text-white"
                      >
                        {{ btnTextClose }}
                      </button>
                      <button
                        :type="btnType"
                        @click="$emit('submit')"
                        :class="`${btnColorSubmit} hover:${btnColorSubmit}/80`"
                        class="px-5 py-2 rounded text-white"
                      >
                        {{ btnTextSubmit }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </teleport>
    <!-- Pastdagi tugma olib tashlandi -->
  </div>
</template>

<style>
  .heading {
    @apply text-2xl font-semibold text-gray-800;
  }
  .heading .subtitle {
    @apply text-sm font-normal text-gray-400;
  }
  .modal-overlay {
    @apply font-lexend w-full h-screen fixed top-0 inset-0;
  }
  .modal-body {
    @apply p-5;
  }
  .modal-footer {
    @apply p-4 bg-gray-50 dark:bg-gray-700;
  }
  /*
  Enter and leave animations can use different
  durations and timing functions.
*/
  .slide-up-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-up-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
