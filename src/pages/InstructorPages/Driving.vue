<template>
  <div :class="$style.wrapper">
    <UiCalendar
      :available-days="availableDays"
      @selected="selectedDateHandler"
      @unselected="unSelectedDateHandler"
      :initDate = 'date'
    ></UiCalendar>
    <ul
      v-if="currentDateData"
      :class="$style.body_ul"
    >
      <li
        v-for="(lesson, index) in currentDateData.lessons"
        :key="index"
        class="flex"
        @click='$router.push({ name: "drivingDetails", params: {lesson: lesson, date: currentDate}})'
        :class="$style.body_li"
      >
        {{`${lesson.time}, ${lesson.duration} ${lesson.studentName}`}}
        <UiIcon
          :class="$style.body_icon"
          :color-inheritance="true"
          :em-size="false"
          name="arrow"
        />
      </li>

    </ul>
  </div>
</template>
<script>
  import UiCalendar from '../../components/UiCalendar';
  import UiIcon from '../../components/UiIcon';

  export default {
    name: 'Driving',
    components: {
      UiCalendar,
      UiIcon,

    },
    props: {
      date: {
        required: false,
        type: String,
      },
    },
    data() {
      return {
        isPopupVisible: false,
        currentDateData: '',
        dates: undefined,
        availableDays: undefined,
        currentDate: undefined,
      };
    },
    async created() {
      this.dates = this.$store.state.instructorInfo.dates;
      await this.$store.dispatch('instructorInfo/fetchAvailableDays');
      this.availableDays = this.$store.state.instructorInfo.availableDays

    },
    methods: {

     async selectedDateHandler(date) {
        this.currentDate = date;
        this.currentDateData = await this.$store.dispatch('instructorInfo/fetchCurrentDayData', date);

      },
      unSelectedDateHandler() {
        this.currentDateData = undefined;
        this.currentDate = undefined;
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
  }

  .body_ul {
    border-bottom: 0.5px solid $colorGray4;

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

  .body_icon {
    color: rgba(60, 60, 67, 0.3);
    transform: rotate(180deg) scale(0.7);
    margin: 0 16px 0 auto;
  }


</style>
