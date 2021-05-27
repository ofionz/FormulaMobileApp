<template>
  <div>
    <q-field
      :value="state"
      :rules="rules"
      ref="field_checkbox"
      borderless
      no-error-icon
      class='chekbox_field'

    >
      <q-checkbox
        :class="$style.checkbox"
        @input="changeHandler"
        v-model="state"
        type="checkbox"
        :disable='disable'
        size="md"
        :label="label"
      >
      </q-checkbox>
    </q-field>
  </div>
</template>
<script>
  export default {
    name: 'UiCheckbox',
    components: {},

    props: {
      checked: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: null,
      },
      rules: {
        type: Array,
      },
      disable: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      state: false,
    }),
    computed: {
      // classesCheckbox() {
      //   const { $style } = this;
      //   return {
      //     [$style.checkbox]: true,
      //     [$style.checked]: this.state,
      //   };
      // },

    },
    watch: {
      checked(newValue) {
        if (newValue === this.state) return;
        this.changeHandler();
      },
    },
    mounted() {
      this.state = this.checked;
    },
    methods: {
      validate() {
        return this.$refs.field_checkbox.validate();
      },
      changeHandler() {
        if (this.disabled) return;
        this.$emit('change', this.state);
      },
    },
  };
</script>

<style
  lang="scss"
  module
>
  //$
  .field {

  }

  .checkbox div {
    border-radius: 50%;
  }

  .checkbox svg {
    transform: scale(0.76);
  }

  .checkbox:last-child {
    @include text_16-22_medium;
  }

</style>

<style>
  .chekbox_field .q-field__bottom {
    font-weight: 500;
    font-size: 12px;
    left: 40px;
    bottom: 10px;
  }
</style>

