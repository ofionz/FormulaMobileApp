<template>
  <div>
    <div
      :class="$style.swiperWrap"
      class="q-pt-xl q-pb-lg"
    >
      <swiper
        :options="swiperOption"
        :class="$style.swiper"
      >
        <swiper-slide
          v-for="(month, index) in monthesList"
          :key="index"
          :class="$style.slide"
        >
          <div :id="'slideID' + index">
            <span @click="changeMonth(index)">
              {{
                month.date | dateFilter('strMonth') | stringFilter('capitalize')
              }}</span
            >
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <q-date
      v-model="date"
      :events="events"
      class="calendar"
      first-day-of-week="1"
      @input="changeHandler"
      :options="availableDays"
      :locale="{
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        days: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        monthsShort: [
          'Янв',
          'Фев',
          'Мар',
          'Апр',
          'Май',
          'Июн',
          'Июл',
          'Авг',
          'Сен',
          'Окт',
          'Ноя',
          'Дек'
        ],
        months: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ]
      }"
      minimal
    />
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/swiper.scss';
  import dateFilter from '../filters/date.filter';
  import stringFilter from '../filters/string.filter';

  let swiper = null;
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    filters: {
      dateFilter,
      stringFilter,
    },
    props: {
      events: {
        type: Array,
      },
      monthes: {
        type: Array,
      },
      availableDays: {
        type: Array,
      },
      initDate: {
        type: String,
      },
    },
    data() {
      return {
        monthesList: undefined,
        countBeforeAndAfterCurrentMonth: 3,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 15,
          slidesPerGroup: 1,
          centeredSlidesBounds: true,
          centeredSlides: true,
          breakpoints: {
            1100: {
              slidesPerView: 8,
              spaceBetween: 36,
            },
            940: {
              slidesPerView: 7,
              spaceBetween: 32,
            },
            790: {
              slidesPerView: 6,
              spaceBetween: 28,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            380: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          },
        },
        date: undefined,
      };
    },

    async created() {
      if (this.monthes) {
        this.monthesList = this.monthes;
      } else this.monthesList = this.generateMonthes();
    },
    mounted() {
      swiper = document.querySelector('.swiper-container').swiper;
      this.changeMonth(this.findCurrentMonthIndex(this.initDate), this.initDate);
      // this.$emit('selected', this.date);
    },
    methods: {
      changeHandler(value, reason, details) {
        if (reason === 'add-day') this.$emit('selected', this.date);
        else if (reason === 'remove-day') this.$emit('unselected');
      },
      findCurrentMonthIndex(thisdate = '') {
        let today;
        if (thisdate) today = new Date(thisdate);
        else today = new Date();
        let index = this.monthesList.findIndex(
          elem =>
            new Date(elem.date).getFullYear() == today.getFullYear() &&
            new Date(elem.date).getMonth() == today.getMonth(),
        );
        return index;
      },
      changeMonth(newMonthIndex, date = undefined) {
        this.$emit('unselected');
        swiper.slideTo(newMonthIndex, 1000);
        for (const idMonth in this.monthesList) {
          const lst = document.querySelector(`#slideID${idMonth}`).classList;
          lst.remove('month_selected');
          lst.add('month_not_selected');
        }
        document
          .querySelector(`#slideID${newMonthIndex}`)
          .classList.add('month_selected');
        document
          .querySelector(`#slideID${newMonthIndex}`)
          .classList.remove('month_not_selected');
        if (date) {
          this.date = date;
        }
        else {
          this.date = this.monthesList[newMonthIndex].date;
        }
        this.$emit('selected', this.date);
      },

      generateMonthes() {
        const counter = this.countBeforeAndAfterCurrentMonth;
        let monthes = [];
        let today = new Date();
        for (let i = 0; i < counter; i++) {
          let copy = new Date(today);
          copy.setMonth(today.getMonth() - (counter - i));
          copy.setDate(1);

          monthes[i] = {
            date: this.formatDate(copy),
          };
        }
        monthes[counter] = {
          date: this.formatDate(today),
        };

        for (let i = 1; i <= counter; i++) {
          let copy = new Date(today);
          copy.setMonth(today.getMonth() + i);
          copy.setDate(1);
          monthes[i + counter] = {
            date: this.formatDate(copy),
          };
        }
        return monthes;
      },

      formatDate(date) {
        let d = new Date(date),
          month = '' + (date.getMonth() + 1),
          day = '' + date.getDate(),
          year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
      },
    },
  };
</script>

<style lang="scss">
  .calendar {
    box-shadow: none;
    width: 100%;
    height: 280px;
    border-radius: 0;
  }

  .q-date__navigation {
    display: none;
  }

  .q-date__calendar-weekdays {
    background-color: $colorGray2;
    color: $colorGray3;
  }

  .q-date__calendar-days-container {
    height: inherit;
    min-height: auto !important;
    border-bottom: 0.5px solid #c6c6c9;
  }

  .q-date__event {
    z-index: -1;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background: #f2f4f6;
    transform: translate(-50%, 18%);
  }

  .q-date__calendar {
    min-height: 0;
    padding: 0;
  }

  .q-date__calendar-days-container .block {
    font-weight: 500;
    font-size: 15px !important;
    line-height: 18px;
  }

  .q-date__calendar-item {
    font-weight: 600;
    font-size: 15px !important;

    & button.q-btn-item.bg-primary {
      @include gradientBrand;
      height: 40px;
      width: 40px;

      & .q-date__event {
        background-color: transparent !important;
      }
    }

    q-date__today {
      box-shadow: none !important;
    }
  }

  .month_not_selected {
    margin-top: 8px;
  }

  .month_selected {
    @include gradientBrand;
    width: fit-content;
    border-radius: 50px;
    height: 32px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
      padding: 0 8px 0 8px;
      color: $colorWhite;
    }
  }
</style>
<style
  lang="scss"
  module
>
  //$
  .swiperWrap {
    background-color: #f2f4f6;
  }

  .swiper {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: $colorGray3;
  }

  .slide {
    display: flex;
    justify-content: center;
    white-space: nowrap;
    min-width: 110px;
  }
</style>
