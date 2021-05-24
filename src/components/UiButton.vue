<template>
  <component
    :is="tag"
    :class="classesRoot"
    :type="internalType"
    :disabled="disabled"
    v-on="$listeners"
  >
    <span :class="$style.inner" :style="innerStyle">
      <span :class="$style.gradientSpan" >
        <slot />
      </span>
    </span>
  </component>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    tag: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "button"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: null
    },
    nowrapped: {
      type: Boolean,
      default: true
    },
    squared: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "normal"
    },
    flat: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: "center"
    },
    innerStyle: {
      type: [Object, String],
      default: null
    }
  },
  computed: {
    classesRoot() {
      const { $style, size, theme, flat, textAlign } = this;
      return {
        [$style.root]: true,
        [$style.isNoWrap]: this.nowrapped,
        [$style.isSquared]: this.squared,
        [$style.isFlat]: flat,
        [$style.isDepressed]: (this.depressed && !flat) || this.outline,
        [$style.isDisabled]: this.disabled,
        [$style.sizeSmall]: size === "small",
        [$style.sizeNormal]: size === "normal",
        [$style.sizeLarge]: size === "large",
        [$style.themeSilent]: theme === "silent",
        [$style.themeGray]: theme === "gray",
        [$style.themeDanger]: theme === "danger",
        [$style.themeBackgroundBrand]: theme === "background-brand",
        [$style.themeModal]: theme === "modal",
        [$style.themeOutlineBrand]: theme === "outline-brand",
        [$style.textAlignLeft]: textAlign === "left",
        [$style.textAlignCenter]: textAlign === "center",
        [$style.textAlignRight]: textAlign === "right",
        [$style.textAlignJustify]: textAlign === "justify"
      };
    },
    internalType() {
      return this.tag === "button" ? this.type : null;
    }
  }
};
</script>

<style lang="scss" module>
.root {
  @include resetButton;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: $primaryTransition;
  position: relative;
  outline: none;
  vertical-align: middle;
  user-select: none;
  border-radius: 14px;
  height: 56px;
  width: 100%;
  cursor: pointer;

  &.isSquared {
    border-radius: 0;
  }

  &.isDisabled {
    color: #cecece;
    pointer-events: none;
  }

  &:hover {
    z-index: 1;
  }

  &:not(.isDepressed):not(.isFlat):not(.themeSilent) {
    box-shadow: 0 1px 8px 0 transparent;

    &:hover {
      &:not([disabled]) {
        box-shadow: 0 1px 8px 0 rgba(#000, 0.2);
      }
    }

    &:active {
      &:not([disabled]) {
        box-shadow: 0 1px 8px 0 rgba(#000, 0.2);
      }
    }
  }
}

.inner {
  @include text_16-22_medium;
  font-weight: 600;
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  width: inherit;
  border-radius: inherit;
  padding: 12px;
  color: inherit;
  position: relative;
  box-sizing: border-box;

  .isNoWrap & {
    white-space: nowrap;
  }

  .sizeSmall & {
    padding: 8px;
  }

  .sizeLarge & {
    padding: 16px;
  }

  .textAlignLeft & {
    justify-content: flex-start;
  }

  .textAlignCenter & {
    justify-content: center;
  }

  .textAlignRight & {
    justify-content: flex-end;
  }

  .textAlignJustify & {
    justify-content: space-between;
  }
}

.themeSilent {
  cursor: default !important;

  & .inner {
    width: auto;
  }
}

.themeModal {
  background-color: $colorDarkBlue;
  color: $colorWhite;

  & .inner {
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
  }
}

.themeGray {
  background-color: $colorGrayLight;

  &.isDepressed,
  &.isFlat {
    background-color: $colorGrayLight;

    &:hover {
      &:not([disabled]) {
        background-color: darken($colorGrayLight, 5%);
      }
    }

    &:active {
      &:not([disabled]) {
        background-color: darken($colorGrayLight, 5%);
      }
    }
  }
}

.themeDanger {
  background-color: $colorDanger;
  color: $colorWhite;
}

.themeBackgroundBrand,
 {
  &::before {
    content: "";
    display: block;
    @include gradientBrand;
    border-radius: inherit;
    position: absolute;
    @include positionAll(0);
  }

  &.isDisabled::before {
    opacity: 0.5;
    filter: grayscale(1);
  }
}

.themeBackgroundBrand {
  & .inner {
    color: $colorWhite;
  }
}





.themeOutlineBrand {
  border: double 2px transparent;
  border-radius: 10px;
  padding: 0;

  background-image: linear-gradient(#F6F6F6, #F6F6F6), radial-gradient(circle at top left, #0661b2, #cc0b19);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display:flex;
  justify-content: center;
  align-items: center;



  & .gradientSpan {
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    background: linear-gradient(78deg, #0661B2 10.13%, #CC0B19 82.47%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #0B2349;
  }

    &.sizeSmall .inner {
    padding: 6px;
  }

  &.sizeLarge .inner {
    padding: 14px;
  }
}
</style>
