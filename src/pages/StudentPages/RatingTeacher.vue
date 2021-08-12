<template>
  <div :class="$style.wrapper">
    <div
      v-for="(questionElem, index) in questions"
      :key="index"
    >
      <div
        v-if="index === iterator"
        class="flex column"
      >
        <span :class="$style.teacher_title">
          Оцените инструктора по вождению
        </span>
        <div
          class="flex"
          :class="$style.driving_info"
        >
          <span
            class="q-mr-sm q-mb-sm"
            :class="$style.driving_date"
          >{{
            questionElem.lesson_info.date
          }}</span>
          <span :class="$style.driving_time">{{
            questionElem.lesson_info.time
          }}</span>
        </div>
        <span
          class="q-mb-md"
          :class="$style.teacher_name"
        >
          {{ questionElem.lesson_info.teacher }}
        </span>
        <span :class="$style.teacher_info">
          {{ questionElem.lesson_info.description }}
        </span>
        <span
          class="q-mr-md q-mb-sm"
          :class="$style.teacher_question"
        >{{questionElem.question.title}}</span>

        <div
          v-if="questionElem.question.template === 'buttons'"
          :class="$style.buttons"
        >
          <span
            v-for="(answer, index) in questionElem.question.answers"
            :key="index"
            @click="
              currentAnswer = {
                id: questionElem.id,
                q_id: questionElem.question.id,
                value: answer.value
              }
            "

            :class="{
             [$style.buttons__item]: true,
             [$style.isActive]: answer.value === currentAnswer.value
            }"
          >
            {{ answer.title }}</span
          >
        </div>
        <div
          v-else-if="questionElem.question.template === 'smiles'"
          :class="$style.smiles"
        >

            <button
              v-for="(answer, index) in questionElem.question.answers"
              :key="index"
              :class="{
              [$style.button]: true,
              [$style.isActive]: answer.value === currentAnswer.value
            }"
              @click=" () =>
              currentAnswer = {
                id: questionElem.id,
                q_id: questionElem.question.id,
                comment: answer.comment,
                checkbox: answer.checkbox,
                value: answer.value,
              }
            "
            >
              <UiIcon
                v-if="answer.icon"
                :class="$style[answer.icon]"
                :color-inheritance="true"
                :name="answer.icon"
              />
              <span :class="$style.rating">{{ answer.title }}</span>
            </button>

        </div>

        <div class="flex column"  v-if="currentAnswer.checkbox" >
          <q-checkbox v-for="(check, index) in currentAnswer.checkbox" :key="index" :label="check.text" v-model = check.value size="sm" color="grey">
          </q-checkbox>
        </div>

        <q-input
          v-if="currentAnswer.comment"
          label-slot
          v-model = "currentAnswer.comment.value"
          class="input"

        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Комментарий
            </div>
          </template>
        </q-input>

        <div
          class="q-mt-md"
          v-if="currentAnswer"
        >
          <UiButton
            @click="setAnswer()"
            fluid
            theme="outline-brand"
            :class="$style.popup_btn"
          >
            Отправить
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UiButton from '../../components/UiButton';
  import UiIcon from '../../components/UiIcon';

  export default {
    name: 'RatingTeacher',

    components: {
      UiIcon,
      UiButton,
    },
    data() {
      return {
        currentAnswer: '',
        iterator: 0,
        allAnswers: [],
      };
    },

    // async created() {
    //   // this.$router.push({ name: 'driving' });
    // },

    computed: {
      questions() {
        return this.$store.state.studentInfo.feedbackQuestions;
      },
    },
    methods: {
      async setAnswer() {
        this.allAnswers.push(this.currentAnswer);
        this.currentAnswer = '';
        this.iterator++;
        if (this.iterator === this.questions.length) {
          await this.$store.dispatch('studentInfo/sendFeedbackAnswers', this.allAnswers);
          this.$store.commit('studentInfo/setFeedbackQuestions', []);
          this.$router.push({ name: 'driving' });
        }


        // console.log(value);
        // console.log(q_id);
        // console.log(id);
      },
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

  .teacher_name {
    @include title_20-24_bold;
    text-align: center;
  }

  .teacher_info {
    @include signature_12-16_semibold;
    color: $colorGray;
    margin-bottom: 32px;
  }

  .driving_info {
    @include title-mini_18-22_semibold;
    justify-content: center;
  }

  .teacher_question {
    @include title-subscreen_16-20_semibold;
    font-weight: 700;
  }

  .buttons {
    @include signature_12-16_semibold;
    font-weight: 500;

    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .buttons__item {
    padding: 10px 18px;
    border: 1px solid #eeeeee;
    margin-right: 4px;
    margin-top: 4px;
    position: relative;
  }

  /*.buttons__item:first-child:after{*/
  /*  content: "";*/
  /*  display: block;*/
  /*  width: 1px ;*/
  /*  background:  #EEEEEE;*/
  /*  height: 100%;*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  right: 0;*/
  /*}*/

  .smiles {
    padding: 0 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    margin: 2px;
  }

  .button {
    color: $colorGray7;
  }

  .button:hover,
  .isActive {
    outline: none;
    border: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    font-weight: 600;
  }

  .button:hover .smile_amazing svg path,
  .isActive .smile_amazing svg path,
  .button:focus .smile_amazing svg path,
  .isActive .smile_amazing svg path,
  .button:active .smile_amazing svg path,
  .isActive .smile_amazing svg path {
    fill: $colorOrange;
  }

  .button:hover .smile_good svg path,
  .isActive .smile_good svg path,
  .button:focus .smile_good svg path,
  .isActive .smile_good svg path,
  .button:active .smile_good svg path,
  .isActive .smile_good svg path {
    fill: $colorGreen;
  }

  .button:hover .smile_bad svg path,
  .isActive .smile_bad svg path,
  .button:focus .smile_bad svg path,
  .isActive .smile_bad svg path,
  .button:active .smile_bad svg path,
  .isActive .smile_bad svg path {
    fill: $colorRedLight;
  }

  .smile_amazing,
  .smile_good,
  .smile_bad {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .smile_amazing svg,
  .smile_good svg,
  .smile_bad svg {
    width: auto !important;
    height: auto !important;
    margin-bottom: 5px;
    transition: 0.4s;
  }

  .rating {
    @include signature_12-16_semibold;
  }
</style>
