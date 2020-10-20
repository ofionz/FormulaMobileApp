<template>
  <div>
    <div :class="$style.swiperWrap" class ="flex column">
    <swiper
      class="flex column" :class="$style.swiper"
      :options="swiperOption"
    >

      <swiper-slide
        v-for="(slide, index) in swiperData.slides"
        :key="index"
        :class="$style.slide"
      >
        <div class=" flex column" :class="$style.swiper_inner">
          <img
            v-if="slide.imageURL"
            :src='slide.imageURL'
            alt="picture"
          >
          <span :class="$style.swiperHeader" class="q-mb-sm" >
            {{slide.title}}
          </span>
          <span :class="$style.swiperDescription">
            <span v-for="(row,index) in slide.description" :key="index">{{row}}<br></span>
          </span>

          <div :class="$style.priceWrap">
              <span :class="$style.price">
            {{slide.price}}
          </span>
          </div>
        </div>
        <span
          v-if="slide.imageURL"
          :class="$style.swiperImgDescription"
        > {{slide.imageDescription}}</span>

      </swiper-slide>
    </swiper>
    <q-date
      v-model="date"
      :events="events"
      class="calendar"
      first-day-of-week="1"
      :options="options"
      :locale="{
          daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          days: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
          monthsShort: [
            'Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'
          ],
          months: [
            'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
          ]
        }"
      minimal
    />
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        date: '2020/10/20',
        events: [
          '2020/10/10',
          '2020/10/20',
        ],
        options: [ '2020/10/10', '2020/10/20', '2020/10/15', '2020/10/21', '2020/10/25', '2020/10/29', '2020/10/06',]
      };
    },
  };
</script>

<style lang="scss">
  .calendar{
    box-shadow: none;
    width: 100%;
    height: 100%;
    border-radius: 0;
    border-bottom: 0.5px solid #C6C6C9;

  }
  .q-date__navigation {
    display: none;
  }
  .q-date__calendar-weekdays {
    background-color: $colorGray2;
    color: $colorGray3;
  }
  .q-date__calendar-days-container {
    height: 100%;
  }
  .q-date__event {
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: #f2f4f6;
    transform: translate(-50%, +5%);
  }
  .q-date__calendar {
    padding: 0;
  }
  .q-date__calendar-days-container .block {
    font-weight: 500;
    font-size: 15px!important;
    line-height: 18px;
  }
  .q-date__calendar-item {
    font-weight: 600;
    font-size: 15px!important;
    & button.q-btn-item.bg-primary {
        @include gradientBrand;
      & .q-date__event {
        background-color: transparent !important;
      }
    }
  }
</style>
