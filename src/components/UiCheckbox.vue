<template>
  <div>
    <div :class="classesRoot">
      <label :class="classesCheckbox">
        <input
          :id="uniqueId"
          :name="name"
          :value="value"
          :checked="state"
          :required="required"
          :disabled="disabled"
          type="checkbox"
          @change="changeHandler"
        >
        <UiIcon
          :class="$style.icon"
          :color-inheritance="true"
          name="check"
        />
      </label>
      <label
        v-if="$scopedSlots.default"
        :for="uniqueId"
        :class="$style.label"
      >
        <slot name="default" />
      </label>

    </div>
    <p
      v-if="showError"
      class="input_hint"
      ref="hint"
      :class="$style.hint"
    >{{errorText}}</p>
  </div>
</template>

<script>
  import { isArray, generateId } from '../utils';
  import UiIcon from '../components/UiIcon';

  export default {
    name: 'UiCheckbox',
    components: {
      UiIcon,
    },
    model: {
      prop: 'model',
      event: 'change',
    },
    props: {
      id: {
        type: [String, Number],
        default: null,
      },
      model: {
        type: [Boolean, Array],
        default: undefined,
      },
      checked: {
        type: Boolean,
        default: undefined,
      },
      value: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      errorText: {
        type: String,
        default: null,
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      defaultState: false,
      uniqueId: null,
      showError: false
    }),
    computed: {
      classesCheckbox() {
        const { $style } = this;
        return {
          [$style.checkbox]: true,
          [$style.checked]: this.state,
        };
      },
      classesRoot() {
        const { $style } = this;
        return {
          [$style.container]: true,
          [$style.isDisabled]: this.disabled,
          [$style.isActive]: this.state,
        };
      },
      state() {
        if (this.model === undefined) {
          if (this.checked === undefined) {
            return this.defaultState;
          }
          return this.checked;
        }

        if (isArray(this.model)) {
          return this.isInModel;
        }

        return this.model;
      },
      indexOfModel() {
        return this.model.indexOf(this.value);
      },
      isInModel() {
        return this.indexOfModel > -1;
      },
    },
    watch: {
      checked(newValue) {
        if (newValue === this.state) return;
        this.changeHandler();
      },
    },
    mounted() {
      this.uniqueId = this.id ?? generateId('checkbox-');
    },
    methods: {

      validate() {
        this.showError = !this.state;
      },


      changeHandler() {
        if (this.disabled) return;

        let value;

        if (isArray(this.model)) {
          value = this.model.slice(0);

          if (this.isInModel) {
            value.splice(this.indexOfModel, 1);
          } else {
            value.push(this.value);
          }
        } else {
          value = !this.state;
          this.defaultState = !this.defaultState;
        }

        if (this.required) {
          this.validate();
        }
        this.$emit('change', value);
      },
    },
  };
</script>

<style
  lang="scss"
  module
>
  $size: 22px;

  .container {
    display: flex;
    flex: 0 0 auto;
    line-height: $size;
    position: relative;
    user-select: none;
  }

  .checkbox {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $size;
    width: $size;
    border: 1.5px solid #aeaeb2;
    border-radius: $size;
    position: relative;
    transition: all ease .3s;
    box-sizing: border-box;
    cursor: pointer;

    input[type=checkbox] {
      position: absolute;
      -webkit-appearance: none;
      appearance: none;
      left: -999rem;
    }

    .isDisabled & {
      opacity: 0.14;
      pointer-events: none;
    }
  }

  .checked {
    border: 1.5px solid $colorInteractive;
    background: $colorInteractive;

  }

  .icon {
    height: $size/2+$size/12;
    width: $size/2+$size/12;
    font-size: $size - 6;
    transition: ease .25s;
    opacity: 0;
    color: $colorWhite;

    .isActive & {
      opacity: 1;
    }
  }

  .hint {
    margin-top: 7px;
    border-top: 3px solid $colorDanger;
    color: $colorDanger!important;
    font-weight: 500;
  }



  .label {
    padding-left: 8px;
    position: relative;
    cursor: pointer;

    .isDisabled & {
      opacity: .24;
      pointer-events: none;
    }
  }
</style>
