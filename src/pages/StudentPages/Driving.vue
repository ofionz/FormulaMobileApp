<template>
  <div :class="$style.wrapper">
    <UiCalendar

      :monthes="monthes"
      :events="choosenDays"
      :available-days="availableDays"
      @selected="selectedDateHandler"
      @unselected="unSelectedDateHandler"
    ></UiCalendar>

    <div class="flex column" :class="$style.appointment_wrap">

      <div v-if="currentDateData" class="flex column">
      <span
        v-for="choosenTime in currentDateData.choosenTime"
        :key="choosenTime"
        class="q-mb-md"
        :class="$style.student_appointment"
      >Вы записаны в {{choosenTime}}</span
      >

      </div>
      <span
        v-if="!choosenDays.length"
        class="q-mb-md"
        :class="$style.student_appointment"
        >У вас записей нет, выберите дату, чтобы записать</span
      >
      <div v-if="currentDate" class="flex column">
        <span :class="$style.available_timeTitle">Доступное время:</span>

        <div ref = 'timelist' class="flex" :class="$style.available_timeList">
          <span
            v-for="time in currentDateData.time"
            :key="time"
            @click="selectTimeHandler(time, $event)"
            :class="$style.time"
            >{{ time }}</span
          >
        </div>
      </div>
      <div v-else class="flex column">
           <span
             class="q-mb-md"
             :class="$style.student_appointment"
           >Выберите дату</span
           >

      </div>
    </div>
    <div  :class="$style.btn_wrap" class="flex column">
      <UiButton  v-if="currentTime && currentDate" @click="openPopup" theme="background-brand">
        Записаться
      </UiButton>
      <span @click="$router.push({name: 'driving_history'})" :class="$style.trips_history">История вождений</span>
    </div>

    <UiPopUp
      @close="closePopup"
      :visible="isPopupVisible"
    >
      <template #label>
          Вы записаны!
      </template>
      <template #content>
        <span :class="$style.popup_content">{{currentDate}} в {{currentTime}}</span>
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
import UiCalendar from "../../components/UiCalendar";
import UiButton from "../../components/UiButton";
import UiPopUp from '../../components/UiPopUp';

export default {
  name: "Driving",
  components: {
    UiCalendar,
    UiButton,
    UiPopUp
  },
  data() {
    return {
      isPopupVisible: false,
      monthes: [
        { string: "Октябрь", date: "2019/10/01" },
        { string: "Ноябрь", date: "2019/11/01" },
        { string: "Декабрь 2019", date: "2019/12/01" },
        { string: "Январь 2020", date: "2020/01/01" },
        { string: "Февраль", date: "2020/02/01" },
        { string: "Март", date: "2020/03/01" },
        { string: "Апрель", date: "2020/04/01" },
        { string: "Май", date: "2020/05/01" },
        { string: "Июнь", date: "2020/06/01" },
        { string: "Июль", date: "2020/07/01" },
        { string: "Август", date: "2020/08/01" },
        { string: "Сентябрь", date: "2020/09/01" },
        { string: "Октябрь", date: "2020/10/01" },
        { string: "Ноябрь", date: "2020/11/01" },
        { string: "Декабрь 2020", date: "2020/12/01" },
        { string: "Январь 2021", date: "2021/01/01" },
        { string: "Февраль", date: "2021/02/01" },
        { string: "Март", date: "2021/03/01" },
        { string: "Апрель", date: "2021/04/01" }
      ],
      currentDate: "",
      currentTime: "",
      lessons: [
        { date: "2020/11/03", time: ["9:00", "13:00", "14:00"] },
        { date: "2020/11/10", time: ["9:00", "12:00", "14:00"] },
        {
          date: "2020/11/20",
          time: ["10:00", "11:00", "15:00"],
          choosenTime: ["8:00", "12:00"]
        },
        { date: "2020/11/15", time: ["06:00", "19:00", "12:00","17:00","15:00","14:00","13:00","07:00","20:00","10:00"] },
        {
          date: "2020/11/21",
          time: ["5:00", "15:00", "11:00"],
          choosenTime: ["9:00"]
        },
        { date: "2020/11/25", time: ["4:00", "12:00", "19:00"] },
        { date: "2020/11/29", time: ["7:00", "11:00", "14:00"] },
        { date: "2020/11/06", time: ["8:00", "13:00", "15:00"] }
      ]
    };
  },
  computed: {
    choosenDays() {
          return this.lessons.filter((el) =>  el.hasOwnProperty('choosenTime')).map(el => el.date)
    },
    availableDays() {
      return this.lessons.map(el => el.date);
    },
    currentDateData() {
      return this.lessons.find(el => el.date === this.currentDate);
    }
  },
  methods: {
    closePopup() {
      this.$emit('blockToggle', false);
      this.isPopupVisible = false;
    },
    openPopup() {
      this.$emit('blockToggle', true);
      this.isPopupVisible = true;
    },
    selectedDateHandler(date) {
      this.currentTime = "";
      this.resetCurrentDateTimeStyles ();
      this.currentDate = date;
    },
    selectTimeHandler(time, event) {
      if (this.currentTime === time) {
        this.currentTime = "";
          event.target.classList.remove(this.$style.choosedTime);
      } else if (this.currentTime === "") {
        this.currentTime = time;
          event.target.classList.add(this.$style.choosedTime);
      } else if (this.currentTime !== time) {
        this.resetCurrentDateTimeStyles();
        this.currentTime = time;
        event.target.classList.add(this.$style.choosedTime);
      }

    },
    resetCurrentDateTimeStyles (){
       this.$refs.timelist?.childNodes.forEach(span =>
            span.classList.remove(this.$style.choosedTime)) ;
    } ,
    unSelectedDateHandler() {
      this.resetCurrentDateTimeStyles();
      this.currentTime = "";
      this.currentDate = "";
    }
  }
};
</script>

<style lang="scss" module>
//$
.wrapper {
  height: 100vh;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px){
    width: 40%;
    margin: 0 auto;
    border: 2px solid #87878773;
  }
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
  margin: 0 auto ;
  padding: 24px 0 32px;
  color: $colorInteractive;
}

.btn_wrap {
  margin: auto 16px 10px;
}
</style>
