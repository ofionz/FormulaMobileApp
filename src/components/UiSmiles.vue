<template>
  <div :class="$style.root">
    <button
      :class="{
        [$style.button]: true,
        [$style.isActive]: value === 4,
      }"
      @click="clickHandler(4)"
    >
      <UiIcon
        :class="$style.smileGood"
        :style="stylesIcon"
        :color-inheritance="true"
        name="smile_good"
      />
      <span :class="$style.rating">Хорошо</span>
    </button>
    <button
      :class="{
        [$style.button]: true,
        [$style.isActive]: value === 5,
      }"
      @click="clickHandler(5)"
    >
      <UiIcon
        :class="$style.smileAmazing"
        :style="stylesIcon"
        :color-inheritance="true"
        name="smile_amazing"
      />
      <span :class="$style.rating">Потрясяюще</span>
    </button>
    <button
      :class="{
        [$style.button]: true,
        [$style.isActive]: value === 1,
      }"
      @click="clickHandler(1)"
    >
      <UiIcon
        :class="$style.smileBad"
        :style="stylesIcon"
        :color-inheritance="true"
        name="smile_bad"
      />
      <span :class="$style.rating">Не очень</span>
    </button>
  </div>
</template>

<script>
  import UiIcon from '../components/UiIcon';

  export default {
    name: 'UISmiles',
    components: {
      UiIcon,
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: Number,
        default: null,
      },
      size: {
        type: [String, Number],
        default: 1,
        validate: (_) => Number(_) > 0,
      },
    },
    computed: {
      stylesIcon() {
        return {
          fontSize: `${this.size}em`,
        };
      },
    },
    methods: {
      clickHandler(rating) {
        this.$emit('change', rating);
      },
    },
  };
</script>

<style
  lang="scss"
  module
>
  .root {
   padding: 0 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    user-select: none;
    margin-bottom: 32px;
  }

  .button {
    @include resetButton;
    transition: $primaryTransition;
    float: right;
    border: 1px solid $colorGray7;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $colorBlack;
  }
  .button{
    color: $colorGray7;
  }
  .button:hover, .isActive {
    outline: none;
    border: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }

  .button:hover .smileAmazing svg path, .isActive .smileAmazing svg path, .button:focus .smileAmazing svg path, .isActive .smileAmazing svg path, .button:active .smileAmazing svg path, .isActive .smileAmazing svg path  {
    fill: $colorOrange
  }

  .button:hover .smileGood svg path, .isActive .smileGood svg path, .button:focus .smileGood svg path, .isActive .smileGood svg path,   .button:active .smileGood svg path, .isActive .smileGood svg path {
    fill: $colorGreen;
  }

  .button:hover .smileBad svg path, .isActive .smileBad svg path, .button:focus .smileBad svg path, .isActive .smileBad svg path, .button:active .smileBad svg path, .isActive .smileBad svg path  {
    fill: $colorRedLight;
  }

  .smileAmazing, .smileGood, .smileBad {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .smileAmazing svg, .smileGood svg, .smileBad svg {
    width: auto !important;
    height: auto !important;
    margin-bottom: 5px;
    transition: 0.4s;
  }
  .rating{
    @include signature_12-16_semibold;
  }
</style>
