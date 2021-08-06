<template>
  <component
    :is="tag"
    :class="classes"
    @click="clickHandler"
    v-html="icon"
  />
</template>

<script>
  import icons from '../icons';

  const tagValidator = (_) => ['span', 'i'].includes(_);

  export default {
    name: 'UiIcon',
    props: {
      tag: {
        type: String,
        default: 'span',
        validator: tagValidator,
      },
      name: {
        type: String,
        required: true,
      },
      colorInheritance: {
        type: Boolean,
        default: false,
      },
      emSize: {
        type: Boolean,
        default: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      classes() {
        const { $style } = this;
        return {
          [$style.icon]: true,
          [$style.emSize]: this.emSize,
          [$style.colorInheritance]: this.colorInheritance,
        };
      },
      icon() {
        return icons[this.name];
      },
    },
    methods: {
      clickHandler(event) {
        if (this.disabled) return;
        this.$emit('click', event);
      },
    },
  };
</script>

<style lang="scss" module>
  .icon {
    display: inline-flex;
    vertical-align: middle;
    flex-shrink: 0;
    backface-visibility: hidden;

    &.colorInheritance {
      svg {
        fill: currentColor;
      path {
         fill: currentColor;;
      }
      }
  }
    .emSize {
      width: 1em;
      height: 1em;
      svg {
        width: 1em;
        height: 1em;
      }
    }


  }
</style>
