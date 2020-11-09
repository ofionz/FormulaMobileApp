<template>
    <div :class="$style.wrapper">
      <div class="flex column">
          <span :class="$style.teacher_title">
        Оцените преподавателя по теории
      </span>
        <span
          class="q-mb-md"
          :class="$style.teacher_name">
        Иванов Иван Иванович
      </span>
        <span :class="$style.teacher_info">
          Результаты анонимные. Нам важно ваше мнение. Опрашиваем, чтобы улучшать работу инструкторов и поощрать их.
        </span>
        <ui-smiles />
        <q-input
          label-slot
          class="input"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Комментарий
            </div>
          </template>
        </q-input>
      </div>
  </div>
</template>

<script>
  import UiSmiles from '../../components/UiSmiles';

  export default {
    name: 'RatingTheoryTeacher',
    components: {
      UiSmiles,
    },
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
  .teacher_name{
    @include title_20-24_bold;
    text-align: center;
  }
  .teacher_info{
  @include signature_12-16_semibold;
    color: $colorGray;
    margin-bottom: 32px;
  }

</style>