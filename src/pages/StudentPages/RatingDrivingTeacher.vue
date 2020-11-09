<template>
  <div :class="$style.wrapper">
    <div class="flex column">
      <span :class="$style.teacher_title">
       Оцените инструктора по вождению
      </span>
      <div
        class="flex"
        :class="$style.driving_info">
        <span
          class="q-mr-sm q-mb-sm"
          :class="$style.driving_date">24.07.2020</span>
        <span :class="$style.driving_time">19:00</span>
      </div>
      <span
        class="q-mb-md"
        :class="$style.teacher_name"
      >
        Иванов Иван Иванович
      </span>
      <span :class="$style.teacher_info">
          Результаты анонимные. Нам важно ваше мнение. Опрашиваем, чтобы улучшать работу инструкторов и поощрать их.
        </span>
      <span
        class="q-mr-md q-mb-sm"
        :class="$style.teacher_question">Алексей уделял внимание только вам?</span>
      <div :class="$style.teacher_answer">
        <span :class="$style.teacher_answer__item">Да, был<br>внимателен</span>
        <span :class="$style.teacher_answer__item">Нет, отвлекался на <br> смартфон!</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RatingDrivingTeacher',
  };
</script>

<style
  lang="scss"
  module
>
  //$
  .wrapper {
    padding: 64px 16px;
    max-width: 450px;
    margin: 0 auto;
  }

  .teacher_title {
    @include title-big_30-38_bold;
    text-align: center;
    margin: 0 25px 64px;
  }

  .teacher_name {
    @include title_20-24_bold;
    text-align: center;
  }

  .teacher_info {
    @include signature_12-16_semibold;
    color: $colorGray;
    margin-bottom: 32px;
  }

  .driving_info{
    @include title-mini_18-22_semibold;
    justify-content: center;
  }
  .teacher_question{
    @include title-subscreen_16-20_semibold;
    font-weight: 700;
  }
  .teacher_answer{
    @include signature_12-16_semibold;
    font-weight: 500;
    border: 1px solid red;
    display: grid;
    grid-template-columns: 1fr 1fr
  }
  .teacher_answer__item{
    padding: 10px 18px;
    position: relative;
  }
  .teacher_answer__item:first-child:after{
    content: "";
    display: block;
    width: 1px ;
    background: red;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>