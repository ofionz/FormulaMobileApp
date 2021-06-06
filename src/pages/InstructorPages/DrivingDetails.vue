<template>
  <div>
    <div class="flex column">
      <ui-page-title
        @backward="$router.push({ name: 'instructorDriving' })"
        brand_theme
        paddings
        title="Вождение"
      >
      </ui-page-title>
      <span
        class="q-ml-md q-mt-md q-mb-xs"
        :class="$style.lesson_studentname"
      >{{lesson.studentName}}</span>
      <span
        class="q-mb-lg"
        :class="$style.lesson_title"
      >{{date}}, {{lesson.time}}</span
      >

      <!--<div class="q-mr-md q-ml-md"-->
      <!--     :class="$style.body_buttons__wrap">-->
      <!--  <span v-if="isStarted"-->
      <!--        :class="$style.body_time">Старт в {{`${this.dateTimeStarted.getHours()}:  ${(this.dateTimeStarted.getMinutes()>=10?'':'0')}${this.dateTimeStarted.getMinutes() }`}}, до {{calcFinishTime()}}</span>-->
      <!--  <UiButton-->
      <!--    v-if="isStarted"-->
      <!--    @click="startButtonHandler"-->
      <!--    fluid-->
      <!--    class="q-mt-md"-->
      <!--    theme="outline-brand"-->
      <!--    :class="$style.body_button"-->
      <!--  >-->
      <!--    Закончить-->
      <!--  </UiButton>-->
      <!--  <UiButton-->
      <!--    v-else-->
      <!--    @click="startButtonHandler"-->
      <!--    fluid-->
      <!--    theme="background-brand"-->
      <!--    :class="$style.body_button"-->
      <!--  >-->
      <!--    Начать вождение-->
      <!--  </UiButton>-->
      <!--</div>-->
      <ul :class="$style.body_ul">
        <!--<li      v-if="!isStarted" class="flex" :class="$style.body_li">-->
        <!--  Темы пропущенных занятий-->
        <!--  <UiIcon-->
        <!--    :class="$style.body_icon"-->
        <!--    :color-inheritance="true"-->
        <!--    :em-size="false"-->
        <!--    name="arrow"-->
        <!--  />-->
        <!--</li>-->
        <li
          @click="studentInfoButtonHandler"
          class="flex"
          :class="$style.body_li"
        >
          Карточка курсанта
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
      </ul>
      <!--<span  :class="$style.lesson_title">Посещаемость курсанта: 95%</span>-->
      <!-- <span  :class="$style.lesson_title">  Начало обучения: 01.09.2020 </span>-->
      <!-- <span  :class="$style.lesson_title">  Окончание обучения: 15.10.2020</span>-->

    </div>
  </div>
</template>

<script>
  import UiButton from '../../components/UiButton';
  import UiIcon from '../../components/UiIcon';
  import UiPageTitle from '../../components/UiPageTitle';

  export default {
    name: 'DrivingDetails',
    components: { UiIcon, UiPageTitle },
    props: {
      lesson: {
        required: true,
        type: Object,
      },
      date: {
        required: true,
        type: String,
      },
    },

    data() {
      return {
        isStarted: false,
        dateTimeStarted: undefined,
      };
    },
    methods: {
      startButtonHandler() {
        this.isStarted = !this.isStarted;
        if (!this.dateTimeStarted) this.dateTimeStarted = new Date();
      },
      calcFinishTime() {
        const finishTime = new Date();
        const startTime = this.lesson.time.split(':');
        finishTime.setHours(startTime[0], startTime[1], 0, 0);
        const duration = this.lesson.duration.split(/[\D]/).filter(element => element !== '');
        if (duration[0]) finishTime.setHours(finishTime.getHours() + Number(duration[0]));
        if (duration[1]) finishTime.setMinutes(finishTime.getMinutes() + Number(duration[1]));

        const hours = finishTime.getHours() < 10 ? '0' + finishTime.getHours() : finishTime.getHours();
        const minutes = finishTime.getMinutes() < 10 ? '0' + finishTime.getMinutes() : finishTime.getMinutes();

        return `${hours}:${minutes}`;
      },

      studentInfoButtonHandler() {
       let param =  {
         lesson: this.lesson,
         date: this.date,
         studentId: this.lesson.studentId };
        this.$router.push({ name: 'studentInfo', params: param });

      },
    },
  };
</script>
<style
  lang="scss"
  module
>
  //$
  .body_ul {
    border: 0.5px solid $colorGray4;
    border-left: none;
    border-right: none;
    padding: 0 0 0 16px;
    margin-top: 35px;
  }

  .body_li {
    @include text_16-22_medium;
    list-style-type: none;
    padding: 11px 0;
  }

  .body_li:not(:last-child) {
    border-bottom: 0.5px solid $colorGray4;
  }

  .body_time {
    @include text_16-22_medium;
  }

  .body_buttons__wrap {
    text-align: center;
  }

  .body_button span {
    transition: 0.2s all ease;
  }

  .body_icon {
    color: rgba(60, 60, 67, 0.3);
    transform: rotate(180deg) scale(0.7);
    margin: 0 16px 0 auto;
  }

  .lesson_studentname {
    @include title-mini_18-22_semibold;
  }

  .lesson_title {
    @include signature_12-16_semibold;
    color: $colorGray;
    padding: 0 16px;
  }
</style>
