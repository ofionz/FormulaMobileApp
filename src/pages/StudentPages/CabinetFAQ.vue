<template>
    <div class="flex column">
      <ui-page-title :class="$style.title" @backward = backward title="Частые вопросы"> </ui-page-title>
      <div :class="$style.content_wrap">
        <ul :class="$style.row_list">
          <li
            v-for="(question, index) in questions"
            :key="index"
            class="flex column"
            :class="$style.row"
            @click="toggleQuestion(question)"
          >
            <span :class="$style.row_name">{{ question.name }}</span>
            <span v-if="question === currentQuestion" :class="$style.row_content"> {{ question.content }}</span>
            <UiIcon
              :class="[question === currentQuestion?$style.row_icon__checked:$style.row_icon]"
              :color-inheritance="true"
              :em-size="false"
              name="arrow"
            />
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import UiIcon from "../../components/UiIcon";
import UiPageTitle from "../../components/UiPageTitle";

export default {
  name: "CabinetFAQ",
  components: {
    UiIcon,
    UiPageTitle
  },
  data() {
    return {
      currentQuestion: "",
      questions: [],
    };
  },
  mounted() {
    this.questions = this.$store.getters['questions/getQuestionsList'];
  },
  methods: {
    toggleQuestion(question) {
      this.currentQuestion = this.currentQuestion === question? "": question;
    },
    backward() {
      this.$router.go(-1);
    },
  }
};
</script>
<style lang="scss" module>
//$
.title {
  margin: 54px 16px 26px;
}
.row_list {
  border: 0.5px solid $colorGray4;
  border-left: none;
  border-right: none;
  padding: 0 0 0 16px;
  margin: 8px 0 0;
}

.row {
  @include text_16-22_medium;
  list-style-type: none;
  padding: 11px 30px 11px 0;
  justify-content: space-between;
}

.row:not(:last-child) {
  border-bottom: 0.5px solid $colorGray4;
}

.row_content {
  @include signature_12-16_semibold;
  margin-top: 8px;
}
.row_icon,
.row_icon__checked {
  transform: scale(0.8) rotate(-90deg);
  color: rgba(60, 60, 67, 0.3);
  position: absolute;
  right: 16px;
  transition: 0.2s ease-in-out;
}
.row_icon__checked {
  transform: scale(0.8) rotate(90deg);
}
</style>
