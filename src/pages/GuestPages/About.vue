<template>
  <div :class="$style.about_wrap">
    <UiIcon
      :class="$style.icon"
      :color-inheritance="false"
      name="logo"
      :em-size="false"
    />

    <span :class="$style.about_description"
      >В 2018 и 2019 году стали лучшей автошколой Тюменской области в конкурсе
      Департамента образования и науки Тюменской области
    </span>

    <div :class="$style.about_detail">
      <div class="flex column">
        <div :class="$style.about_num_wrap">
          <span :class="$style.about_num">2</span>
        </div>

        <span :class="$style.about_description">автодрома в черте города </span>
      </div>
      <div class="flex column">
        <div :class="$style.about_num_wrap">
          <span :class="$style.about_num">22</span>
        </div>
        <span :class="$style.about_description"
          >учебных классов для теории
        </span>
      </div>
      <div class="flex column">
        <div :class="$style.about_num_wrap">
          <span :class="$style.about_num">100+</span>
        </div>
        <span :class="$style.about_description"
        >учебных автомобилей
        </span>
      </div>
      <div class="flex column">
        <div :class="$style.about_num_wrap">
          <span :class="$style.about_num">10 000+</span>
        </div>
        <span :class="$style.about_description"
        >курсантов получают права каждый год
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import UiIcon from "../../components/UiIcon";

export default {
  name: "About",
  components: {
    UiIcon
  }
};
</script>

<style lang="scss" module>
//$

.about_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 75px 16px;
  overflow: hidden;
  @media (max-height: 600px) {
    padding: 20px 16px;
  }
}

.about_description {
  @include text_16-22_medium;
  margin-bottom: 32px;
}

.icon {
  position: relative;
  margin-bottom: 108px;
}

.icon:before {
  content: "";
  display: block;
  width: 200%;
  height: 120%;
  position: absolute;
  box-shadow: 0 16px 18px -9px rgba(0, 97, 243, 0.08);
  border-radius: 0 0 150% 150%;
  border-width: 0 0 2px 12px;
  left: -7em;
  top: 3em;
}

.about_detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
}

.about_num_wrap {
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  color: transparent;
  background-color: $colorWhite;
}

.about_num {
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(78deg, #1e68ab 10.13%, #ca0916 82.47%);
}
</style>
