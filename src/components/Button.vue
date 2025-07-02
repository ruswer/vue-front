<template>
  <button
    :type="nativeType"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'blue'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nativeType: {
      type: String,
      default: 'button',
    }
  },
  computed: {
    classes() {
      return [
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        {
          'font-bold rounded py-3 px-6 text-lg bg-primary-500 hover:bg-primary-600 text-white': this.type === 'primary' && !this.disabled,
          'font-bold rounded py-3 px-6 text-lg bg-secondary-500 hover:bg-secondary-600 text-white': this.type === 'secondary' && !this.disabled,
          'font-bold rounded py-3 px-6 text-lg bg-danger-500 hover:bg-danger-600 text-white': this.type === 'danger' && !this.disabled,
          'font-bold rounded py-3 px-6 text-lg bg-success-500 hover:bg-success-600 text-white': this.type === 'success' && !this.disabled,
          'font-bold rounded py-3 px-6 text-lg bg-warning-500 hover:bg-warning-600 text-white': this.type === 'warning' && !this.disabled,
          'font-bold rounded py-3 px-6 text-lg bg-info-500 hover:bg-info-600 text-white': this.type === 'info' && !this.disabled,
          'font-bold rounded py-3 px-6 text-lg bg-blue-600 hover:bg-blue-500 text-white': this.type === 'blue' && !this.disabled,
        },
      ];
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    },
  },
};
</script>
