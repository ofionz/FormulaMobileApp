<template>
  <div :class="$style.wrapper">
    <UiCalendar
      :available-days="availableDays"
      @selected="selectedDateHandler"
      @unselected="unSelectedDateHandler"
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
    data() {
      return {
        isPopupVisible: false,
        monthes: [
          { string: 'Сентябрь', date: '2020/09/01' },
          { string: 'Октябрь', date: '2020/10/01' },
          { string: 'Ноябрь', date: '2020/11/01' },
          { string: 'Декабрь 2020', date: '2020/12/01' },
          { string: 'Январь 2021', date: '2021/01/01' },
          { string: 'Февраль', date: '2021/02/01' },
          { string: 'Март', date: '2021/03/01' },
          { string: 'Апрель', date: '2021/04/01' },
          { string: 'Май', date: '2021/05/01' },
          { string: 'Июнь', date: '2021/06/01' },
          { string: 'Июль', date: '2021/07/01' },
          { string: 'Август', date: '2021/08/01' },
          { string: 'Сентябрь', date: '2021/09/01' },
          { string: 'Октябрь', date: '2021/10/01' },
          { string: 'Ноябрь', date: '2021/11/01' },
          { string: 'Декабрь 2021', date: '2021/12/01' },
          { string: 'Январь 2022', date: '2021/01/01' },
          { string: 'Февраль', date: '2022/02/01' },
          { string: 'Март', date: '2022/03/01' },
          { string: 'Апрель', date: '2022/04/01' },
          { string: 'Май', date: '2022/05/01' },
        ],
        currentDateData: '',
        dates: undefined,
        availableDays: undefined,
        currentDate: undefined,
      };
    },
    async created() {
      this.dates = this.$store.state.instructorInfo.dates;
      await this.$store.dispatch('instructorInfo/fetchAvailableDays');
      this.availableDays = this.$store.state.instructorInfo.availableDays;
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
