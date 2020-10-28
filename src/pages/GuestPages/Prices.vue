<template>
  <div :class="$style.container">
    <UiSwiper
      v-for="prices in $store.getters['prices/allPrices']"
      :key="prices.name"
      :mode="prices.type"
      @clicked="swiperClickHandler"
      class="q-mb-xl"
      :swiper-data="prices"
    >
    </UiSwiper>
  </div>
</template>

<script>
import UiSwiper from "../../components/UiSwiper";
export default {
  components: {
    UiSwiper
  },
  data() {
    return {};
  },

  methods: {
    swiperClickHandler(slide) {
      this.$router.push({ name: "details", params: {id: slide.id}});
    }
  }
};
</script>
<style lang="scss" module>
.container {
  padding: 28px 0 70px 16px;
}
</style>
