<template>
  <div class="q-pb-md">
    <ul :class="$style.timeline">
      <li
        :class="$style.timeline__elem"
        v-for="(compl, index) in completed"
        :key="compl.header+index"
      >
        <div :class="$style.timeline__dot"></div>
        <div :class="$style.timeline_content">
          <span :class="$style.timeline_content__header">{{
            compl.header
          }}</span>
          <div :class="$style.timeline_content__text">
            {{ compl.body }}
          </div>
        </div>
      </li>
      <li
        :class="$style.timeline__elem"
      >
        <div :class="$style.timeline__dot_current"></div>
        <div id="anchor" :class="$style.timeline_content__current">
          <span :class="$style.timeline_content__header">{{
            current.header
          }}</span>
          <div :class="$style.timeline_content__text">
            {{ current.body }}
          </div>
        </div>
      </li>
      <li
        :class="$style.timeline__elem"
        v-for="(fut, index) in futures"
        :key="fut.header +index"
      >
        <div :class="$style.timeline__dot_future"></div>
        <div :class="$style.timeline_content">
          <span :class="$style.timeline_content__header_future">{{
            fut.header
          }}</span>
          <div :class="$style.timeline_content__text_future">
            {{ fut.body }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UiTimeline",
  props: {
    completed: {
      type: Array,
      required: true
    },
    current: {
      type: Object,
      required: true
    },
    futures: {
      type: Array,
      required: true
    },
  }
};
</script>

<style lang="scss" module>
//$

.timeline {
  padding: 0;
  width: 100%;
  list-style: none;
}

.timeline__elem {
  position: relative;
  line-height: 22px;
  padding: 0 0 60px 2px;
}
.timeline__elem:not(:last-child) {
  margin-bottom: 3px;
}

.timeline__dot,
.timeline__dot_current,
.timeline__dot_future {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 15px;
}
.timeline__dot:before,
.timeline__dot_current:before,
.timeline__dot_future:before {
  content: "";
  background: $colorInteractive;
  display: block;
  position: absolute;
  border: 3px solid transparent;
  border-radius: 100%;
  height: 8px;
  width: 8px;
  top: 7px;
  left: 0;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
}
.timeline__dot:after,
.timeline__dot_current:after,
.timeline__dot_future:after {
  display: block;
  position: absolute;
  width: 3px;
  content: "";
  background: $colorInteractive;
  left: 2.6px;
  top: 19px;
  bottom: -6px;
}

.timeline__dot_current:before {
  width: 12px;
  height: 12px;
  left: -2px;
  top: 7px;
}
.timeline__dot_current:after {
  top: 23px;
}
.timeline__dot_current:after,
.timeline__dot_future:after {
  background: #cbd9e7;
}
.timeline__dot_future:before {
  background: #cbd9e7;
}

.timeline_content {
  padding-left: 18px;
}
.timeline_content__current {
  padding: 2px 0 0 18px;
}
.timeline_content__header,
.timeline_content__header_future {
  @include text_16-22_medium;
}
.timeline_content__text,
.timeline_content__text_future {
  @include signature_12-16_semibold;
}

.timeline_content__header_future,
.timeline_content__text_future {
  opacity: 0.3;
}
</style>
