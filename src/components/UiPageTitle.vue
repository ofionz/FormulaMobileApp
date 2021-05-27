<template>
  <div class="flex" :class="wrapStyles">
    <UiIcon
      @click="$emit('backward')"
      :class="$style.title_icon"
      :color-inheritance="true"
      :em-size="false"
      name="arrow"
    />
    <span :class="$style.title_text">{{title}}</span>
  </div>
</template>

<script>
  import UiIcon from './UiIcon';
  export default {
    name: 'UiPageTitle',
    components: {
      UiIcon
    },
    props: {
      title: {
        type: String
      },
      brand_theme: {
        type: Boolean,
        default: false
      },
      paddings: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      wrapStyles () {
        const { $style } = this;
        return {
          [$style.title]: true,
          [$style.brand_theme]: this.brand_theme,
          [$style.paddings]: this.paddings,
        };
      }
    }
  };
</script>

<style lang="scss" module>
  //$
  .title {
    @include title-subscreen_16-20_semibold;
    color: $colorBlack;
    justify-content: center;
    position: relative;
    &_text {
      padding-left: 20px;
      @include title-subscreen_16-20_semibold;
    }
    &_icon {
      position: absolute;
      left: 0;
      transform: scale(0.9);
    }
  }
  .paddings {
    padding: 55px 0 25px;
  }
  .brand_theme {
    @include gradientBrand;
    & .title_text {
      color: $colorWhite;
    }
    & .title_icon {
      color: $colorWhite;
      left: 16px;
    }
  }


</style>