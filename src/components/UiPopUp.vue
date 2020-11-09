<template>
  <div >
    <div v-if="isBackdropped" :class="$style.backdrop"></div>
    <transition  name="slide-fade">
    <div v-if="isVisible" :style="`transform: translateY(${this.transition}px);`" ref="panel" :class="classesPanel">
      <div
        v-touch-pan.vertical.prevent.mouse="handlePan"
        :class="$style.panel_item__wrap" class="q-mb-xs">
        <span :class="$style.panel_item"></span>
      </div>
      <button @click="closePanel" :class="$style.close_button">
        <UiIcon
          :class="$style.close_icon"
          :color-inheritance="true"
          name="cross"
        ></UiIcon>
      </button>
      <span v-touch-pan.vertical.prevent.mouse="handlePan" :class="$style.panel_label">

      <slot  name="label"></slot>

      </span>
      <div ref="content" :class="$style.content_wrap">
      <slot  name="content">

      </slot>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import UiIcon from "../components/UiIcon";
export default {
  components: {
    UiIcon
  },
  props: {
    targetSelector: {
      type: String,
      default: "#anchor"
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isVisible: false,
      isBackdropped: false,
      transition: "",
      moving: false
    };
  },
  updated() {
    this.scrollTo()
  },
  watch: {
    visible: function(newVal) {
      this.isVisible = newVal;
      this.isBackdropped = newVal;
      if (newVal) this.transition = "";
    },
  },
  computed: {
    classesPanel() {
      const { $style } = this;
      return {
        [$style.panel]: true,
        [$style.transitionReturn]: this.moving,
      };
    }
  },
  methods: {
    scrollTo () {
      const content = this.$refs.content;
      const target = this.$el.querySelector(this.targetSelector);
      if (content && target) {
        const parentTop = content.getBoundingClientRect().top;
        const currentChildTop = target.getBoundingClientRect().top;
        const childParentDistance = Math.abs(parentTop - currentChildTop);
        content.scrollTop = childParentDistance-content.clientHeight/2;
      }

    },
    returnPanel() {
      this.transition = 0;
      this.moving = true;
    },
    closePanel() {
      this.$emit('close');
      this.isBackdropped = false;
      this.isVisible = false;

    },
    handlePan({ evt, ...info }) {
      this.info = info;
      if (info.offset.y > 0) {
        this.moving = false;
        this.transition = info.offset.y;
      }
      if (info.isFinal) {
        const panelHeight = this.$refs.panel.clientHeight;
        if (info.offset.y > (panelHeight*0.3)) {
          this.closePanel();
        } else if (info.offset.y <= (panelHeight*0.3)) {
          this.returnPanel();
        }
      }
    }
  }
};
</script>

<style lang="scss" module>
$panel_top_item_width: 40px;

.backdrop {
  position: fixed;
  z-index: 100;
  left: -10%;
  top: -10%;
  width: 120%;
  height: 110vh;
  background: $colorBlack;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}
.panel {
  z-index: 101;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: $colorWhite;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}
.transitionReturn {
  -webkit-transition: all 0.3s ease-out 0.5s;
  -moz-transition: all 0.3s ease-out 0.5s;
  -o-transition: all 0.3s ease-out 0.5s;
  transition: all 0.3s ease-out 0.5s;
}

.panel_label {

  @include title-mini_18-22_semibold;
  text-align: center;
  margin: 0 auto 8px;
}

.panel_label:before{
  position: absolute;
  z-index: 100;
  left: 0;
  margin-top:28px;
  content: "";
  display: block;
  height: 32px;
  width: 100%;
  background: linear-gradient(180deg, #fff 9.38%, rgba(255, 255, 255, 0) 100%);
}
.panel_label:after{
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: -1px;
  margin-top:28px;
  content: "";
  display: block;
  height: 32px;
  width: 100%;
  background: linear-gradient(0deg, #fff 9.38%, rgba(255, 255, 255, 0) 100%);
}
.panel_item {
  margin: 6px auto 0;
  width: 36px;
  height: 5px;
  border-radius: 4px;
  background: $colorGray1;
}
.panel_item__wrap {
  width: 100%;
  height: 15px;
  display: flex;
}
.content_wrap {
  overflow: scroll;
  display: flex;
  flex-direction: column;

  max-height: 80vh;
}



.close_button {
  outline: none;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  top: 15px;
  border-color: transparent;
  border-radius: 30px;
  background: rgba(118, 118, 128, 0.12);
}
.close_icon {
  position: absolute;
  left: 6.5px;
  top: 6.5px;
  width: 14px;
  height: 14px;
  color: rgba(60, 60, 67, 0.6);
}


</style>
