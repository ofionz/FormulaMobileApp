<template>
  <div>
    <div :class="$style.swiperWrap" class="q-pt-xl q-pb-lg">
      <swiper :options="swiperOption" :class="$style.swiper">
        <swiper-slide
          v-for="(month, index) in monthes"
          :key="index"
          :class="$style.slide"
        >
          <div :id="'slideID' + index">
            <span @click="changeMonth(index)"> {{ month.string }}</span>
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
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper.scss";

let swiper = null;
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    events: {
      type: Array
    },
    monthes: {
      type: Array,
      required: true
    },
    availableDays: {
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 1,
        centeredSlidesBounds: true,
        centeredSlides: true,
        breakpoints: {
          1100: {
            slidesPerView: 8,
            spaceBetween: 36
          },
          940: {
            slidesPerView: 7,
            spaceBetween: 32
          },
          790: {
            slidesPerView: 6,
            spaceBetween: 28
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          500: {
            slidesPerView: 4,
            spaceBetween: 15
          },
          380: {
            slidesPerView: 3,
            spaceBetween: 15
          }
        }
      },
      date: "2020/10/20"
    };
  },
  mounted() {
    swiper = document.querySelector(".swiper-container").swiper;

    this.changeMonth(this.findCurrentMonthIndex());
  },
  methods: {
    changeHandler (value, reason, details){
      if(reason==='add-day') this.$emit('selected', this.date);
      else if (reason === 'remove-day') this.$emit('unselected');
    },
    findCurrentMonthIndex() {
      const today = new Date();
      let index = this.monthes.findIndex(
        elem =>
          new Date(elem.date).getFullYear() == today.getFullYear() &&
          new Date(elem.date).getMonth() == today.getMonth()
      );
      return index
    },
    changeMonth(newMonthIndex) {
      swiper.slideTo(newMonthIndex, 1000);
      for (const idMonth in this.monthes) {
        const lst = document.querySelector(`#slideID${idMonth}`).classList;
        lst.remove("month_selected");
        lst.add("month_not_selected");
      }
      document
        .querySelector(`#slideID${newMonthIndex}`)
        .classList.add("month_selected");
      document
        .querySelector(`#slideID${newMonthIndex}`)
        .classList.remove("month_not_selected");
      this.date = this.monthes[newMonthIndex].date;
    },

  }
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
  min-height: auto!important;
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
<style lang="scss" module>
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
