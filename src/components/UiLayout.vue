<template>
  <q-layout
    :class="layoutClasses"
    view="hHh lpR lFr"
  >
    <q-page-container style="padding-bottom: 0">
      <router-view
        @error="openErrorSwiper"
        @message="openMessageSwiper"
        @blockToggle="toggleScreenBlock"
      />
      <UiPopUp
        @close="closeErrorSwiper"
        :visible="isSliderVisible"
      >
        <template #label>{{ headerError }}</template>
        <template #content>
          <span :class="$style.popup_content" :style="'color:'+color">{{textError}}</span>
        </template>
      </UiPopUp>
    </q-page-container>

    <q-footer
      reveal
      :class="$style.footer"
      class="text-white"
    >
      <q-tabs indicator-color="transparent">
        <q-route-tab
          v-for="(tab, index) in tabs"
          :to="{ name: tab.name }"
          :key="index"
          :active-class="$style.active"
          :class="$style.button"
        >
          <UiIcon
            :class="$style.button_icon"
            :color-inheritance="true"
            :em-size="false"
            :name="tab.iconName"
          />
          <span :class="$style.button_label">{{ tab.label }}</span>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
  import UiIcon from '../components/UiIcon';
  import UiPopUp from './UiPopUp';

  export default {
    components: {
      UiPopUp,
      UiIcon,
    },
    name: 'UiBottomTab',
    props: {
      tabs: {
        required: true,
        type: Array,
      },
    },
    data() {
      return {
        headerError: '',
        textError: '',
        color: '',
        isBlocked: false,
        blockIterator: 0,
        isSliderVisible: false,
      };
    },
    created() {
      this.$eventBus.$on('error', (data) => this.openErrorSwiper(data));
      this.$eventBus.$on('message', (data) => this.openMessageSwiper(data));
    },
    computed: {
      layoutClasses() {
        const { $style } = this;
        return {
          [$style.layout]: true,
          [$style.blocked]: this.isBlocked,
        };
      },
    },
    methods: {
      toggleScreenBlock(block) {
        if (block) this.blockIterator++;
        else this.blockIterator--;
        this.isBlocked = this.blockIterator > 0;
      },
      openErrorSwiper(data) {
        let { header, text } = data;
        if (!header) header = 'Ошибка!';
        this.showSwiper (header, text, '#ff0000');
      },

      openMessageSwiper(data) {

        let { header, text } = data;
        if (!header) header = '';
        this.showSwiper (header, text, '#00ad06');
      },


      showSwiper (header, text, color) {

        this.headerError = header;
        this.textError = text;
        this.color = color;

        this.toggleScreenBlock(true);
        this.isSliderVisible = true;

      },
      closeErrorSwiper() {
        this.toggleScreenBlock(false);
        this.isSliderVisible = false;
      },
    },
  };
</script>

<style
  lang="scss"
  module
>
  .layout {
    height: 100vh;
  }

  .blocked {
    overflow: hidden;
  }

  .footer {
    z-index: 1;
    height: 70px;
    background-color: $colorGray2;
    box-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
  }

  .button {
    color: $colorGray3;
    outline: none;
  }

  .button_label {
    text-transform: none !important;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    letter-spacing: -0.24px;
  }

  .button_icon {
    color: inherit;
    font-size: 30px;
    display: flex;
    align-items: flex-end;
    height: 30px;
    width: auto;
    margin-bottom: 4px;
  }

  .popup_content {
    @include title-mini_18-22_semibold;
    font-weight: 600;
    color: $negative;
    margin: 60px auto 60px;
  }

  .active {
    color: $colorInteractive !important;
  }
</style>
