<template>
  <div :class="$style.wrapper">
    <UiCalendar
      :events="choosenDays"
      :available-days="availableDays"
      @selected="selectedDateHandler"
      @unselected="unSelectedDateHandler"
    ></UiCalendar>
    <div
      class="flex column"
      :class="$style.appointment_wrap"
    >
      <div
        v-if="currentDateData"
        class="flex column"
      >
        <span :class="$style.student_appointment">
          {{ getTimeString() }}
        </span>
      </div>
      <span
        v-if="!choosenDays.length && !currentDate"
        class="q-mb-md"
        :class="$style.student_appointment"
      >У вас записей нет, выберите дату, чтобы записать</span
      >

      <div
        v-else-if="currentDate"
        class="flex column"
      >
        <span :class="$style.available_timeTitle">Доступное время:</span>

        <div
          ref="timelist"
          class="flex"
          :class="$style.available_timeList"
        >
          <span
            v-for="lesson in currentDateData"
            :key="lesson.time"
            @click="selectTimeHandler(lesson.time, $event)"
            :class="[
              currentDateData.find(el => lesson.time === el.time && el.id)
                ? $style.gradient_time
                : '',
              $style.time
            ]"
          >{{ lesson.time }}</span
          >
        </div>
      </div>
      <div
        v-else
        class="flex column"
      >
        <span
          class="q-mb-md"
          :class="$style.student_appointment"
        >Выберите дату</span
        >
      </div>
    </div>
    <div
      :class="$style.btn_wrap"
      class="flex column"
    >
      <UiButton
        v-if="
          currentTime &&
            currentDate &&
            !this.currentDateData.find(
              el => this.currentTime === el.time && el.id
            )
        "
        @click="signUpStudent"
        theme="background-brand"
      >
        Записаться
      </UiButton>
      <UiButton
        v-if="
          currentTime &&
            currentDate &&
            this.currentDateData.find(
              el => this.currentTime === el.time && el.id
            )
        "
        @click="unsignStudent"
        theme="background-brand"
      >
        Отменить в {{ currentTime }}
      </UiButton>
      <span
        @click="$router.push({ name: 'driving_history' })"
        :class="$style.trips_history"
      >История вождений</span
      >
    </div>
    <UiPopUp
      @close="closePopup"
      :visible="isPopupVisible"
    >
      <template #label>
        {{ popupMessage }}
      </template>
      <template #content>
        <span
          :class="$style.popup_content"
        >{{ currentDate }} в {{ currentTime }}</span
        >
        <UiButton
          @click="closePopup"
          fluid
          theme="background-brand"
          :class="$style.popup_btn"
        >
          Отлично!
        </UiButton>
      </template>
    </UiPopUp>


  </div>
</template>
<script>
  import UiCalendar from '../../components/UiCalendar';
  import UiButton from '../../components/UiButton';
  import UiPopUp from '../../components/UiPopUp';

  export default {
    name: 'Driving',
    components: {
      UiCalendar,
      UiButton,
      UiPopUp,
    },
    data() {
      return {
        isPopupVisible: false,
        currentDate: '',
        currentTime: '',
        popupMessage: '',
      };
    },
    async created() {

      if (this.$store.state.studentInfo.feedbackQuestions === undefined) {
        await this.$store.dispatch('studentInfo/fetchFeedbackQuestions');
      }

     if (this.$store.state.studentInfo.feedbackQuestions?.length) {
        await this.$router.push({ name: 'driving_rating' });
      }
      else
        await this.$store.dispatch('studentInfo/fetchAvailableDays');
    },
    computed: {
      availableDays() {
        // return this.$store.state.studentInfo.availableDays.map(el => el.date);
        return this.$store.state.studentInfo.availableDays
          .filter(el => el.can_signed === true)
          .map(el => el.date);
      },
      choosenDays() {
        return this.$store.state.studentInfo.availableDays
          .filter(el => el.can_unsigned === true)
          .map(el => el.date);
      },

      currentDateData() {
        return this.$store.state.studentInfo.availableTime;
        // return this.lessons.find(el => el.date === this.currentDate);
      },
    },
    methods: {
      getTimeString() {
        let arr = this.currentDateData.map((elem) => elem.id ? elem.time : null).filter((el) => el ? el : '');
        if (arr.length) {
          let str = 'Вы записаны в ';
          arr.forEach((el, index) => index === 0 ? str += el : str += ', ' + el);
          return str;
        }
      },


      closePopup() {
        this.$emit('blockToggle', false);
        this.isPopupVisible = false;
      },
      async signUpStudent() {
        if (
          await this.$store.dispatch('studentInfo/signUpStudent', {
            date: this.currentDate,
            time: this.currentTime,
          })
        ) {
          this.$emit('blockToggle', true);
          this.popupMessage = 'Вы записаны!';
          this.isPopupVisible = true;
        }
      },

      async unsignStudent() {
        if (
          await this.$store.dispatch('studentInfo/unsignStudent', {
            date: this.currentDate,
            time: this.currentTime,
          })
        ) {
          this.$emit('blockToggle', true);
          this.popupMessage = 'Вы отменили занятие';
          this.isPopupVisible = true;
        }
      },

      async selectedDateHandler(date) {
        this.currentTime = '';
        this.resetCurrentDateTimeStyles();
        await this.$store.dispatch('studentInfo/fetchAvailableTime', date);

        this.currentDate = date;
      },
      selectTimeHandler(time, event) {
        if (this.currentTime === time) {
          this.currentTime = '';
          event.target.classList.remove(this.$style.choosedTime);
        } else if (this.currentTime === '') {
          this.currentTime = time;
          event.target.classList.add(this.$style.choosedTime);
        } else if (this.currentTime !== time) {
          this.resetCurrentDateTimeStyles();
          this.currentTime = time;
          event.target.classList.add(this.$style.choosedTime);
        }
      },
      resetCurrentDateTimeStyles() {
        this.$refs.timelist?.childNodes.forEach(span =>
          span.classList.remove(this.$style.choosedTime),
        );
      },
      unSelectedDateHandler() {
        this.resetCurrentDateTimeStyles();
        this.currentTime = '';
        this.currentDate = '';
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
    height: 100vh;
    padding-bottom: 70px;
    display: flex;
    flex-direction: column;

    /*@media (min-width: 1200px){*/
    /*  width: 40%;*/
    /*  margin: 0 auto;*/
    /*  border: 2px solid #87878773;*/
    /*}*/
  }

  .appointment_wrap {
    padding: 0 16px 46px;
    margin-top: 50px;
  }

  .student_appointment {
    @include title-mini_18-22_semibold;
  }

  .available_timeTitle {
    @include signature_12-16_semibold;
    margin-bottom: 20px;
  }

  .available_timeList {
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: $colorGray3;

    & .time {
      cursor: pointer;
      margin: 0 10px 14px 10px;
      padding: 6px 10px;
    }

    & .choosedTime {
      @include gradientBrand;
      border-radius: 50px;
      color: $colorWhite;
    }
  }

  .popup_content {
    @include title-mini_18-22_semibold;
    font-weight: 600;
    margin: 16px auto 0;
  }

  .popup_btn {
    margin: 32px 0 66px;
  }

  .trips_history {
    @include signature_12-16_semibold;
    font-weight: 600;
    margin: 0 auto;
    padding: 24px 0 32px;
    color: $colorInteractive;
  }

  .btn_wrap {
    margin: auto 16px 10px;
  }

  .gradient_time {
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(78deg, #1e68ab 10.13%, #ca0916 82.47%);
  }
</style>
