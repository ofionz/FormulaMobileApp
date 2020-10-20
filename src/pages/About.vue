<template>
  <div :class="$style.about_wrap">
    <UiIcon
      :class="$style.icon"
      :color-inheritance="false"
      name="logo"
      :em-size="false"
    />

    <span :class="$style.about_description">Об автошколе, автопарк, автодромы,
      Формула Безопасности, лучшая автошкола 2018. Рассрочка от автошколы. Что ещё?</span>

    <div :class="$style.about_detail">
      <div class="flex column">

        <div :class="$style.about_num_wrap">
          <span :class="$style.about_num">1500</span>
        </div>

        <span :class="$style.about_description">курсантов каждый год</span>
      </div>
      <div class="flex column">
        <div :class="$style.about_num_wrap">
          <span :class="$style.about_num">60</span>
        </div>
        <span :class="$style.about_description">учебных автомобилей</span>
      </div>
    </div>


  </div>
</template>

<script>
  import UiIcon from '../components/UiIcon';

  export default {
    name: 'About',
    components: {
      UiIcon,
    },
  };
</script>

<style
  lang="scss"
  module
>
  //$

  .about_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 75px 16px;
    overflow: hidden;
    @media (max-height: 600px) {
      padding: 5px 16px;
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

  .icon:before{
    content: "";
    display: block;
    width: 200%;
    height: 120%;
    position: absolute;
    box-shadow: 0 16px 18px -9px rgba(0, 97, 243, 0.08);
    border-radius: 0 0 150% 150%;
    border-width:  0 0 2px 12px;
    left: -7em;
    top: 3em;
  }

  .about_detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
  }

  .about_num_wrap{
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    color: transparent;
    background-color: $colorWhite;
  }

  .about_num{
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(78deg, #1e68ab 10.13%, #ca0916 82.47%);
  }



</style>