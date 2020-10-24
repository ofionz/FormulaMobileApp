<template>

  <div class ="flex column">
    <span :class="$style.swiperName">{{swiperData.name}}</span>
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
  </div>

</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/swiper.scss';

  export default {
    name: 'UiSwiper',
    components: {
      Swiper,
      SwiperSlide,
    },
    props: {
      swiperData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 1.4,
          spaceBetween: 20,
          slidesPerGroup: 1,
          loop: false,
          freeMode: true,
          breakpoints: {
            1750: {
              slidesPerView: 6.2,
              spaceBetween: 40
            },
            1450: {
              slidesPerView: 5.2,
              spaceBetween: 36
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 32
            },
            768: {
              slidesPerView: 3.3,
              spaceBetween: 28
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 24
            },
            500: {
              slidesPerView: 1.7,
              spaceBetween: 20
            },
            380: {
              slidesPerView: 1.4,
              spaceBetween: 16
            }
          }
        },
      };
    },
  };
</script>
<style lang="scss"  module>
  .swiper {
    height: fit-content;
    width: 100%;
  }

  .slide {
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
  }

  .swiper_inner {
    box-shadow: 3px 3px 16px rgba(0, 97, 243, 0.08);
    border-radius: 14px;
    width: 100%;
    height: 160px;

    & img {
      width: inherit;
      height: inherit;
      object-fit: cover;
      border-radius: inherit;
    }
  }

  .swiperName {
    @include title_big_30-38_bold;
    margin-bottom: 8px;
    color: #dde5ed;
  }

  .swiperImgDescription {
    margin-top: 8px;
    width: 256px;
  }

  .swiperImgDescription, .swiperHeader {
    @include title_mini_18-22_semibold;
    font-weight: 600;
    color: #33373d;
  }

  .swiperHeader {
    padding: 16px 16px 0;
  }

  .swiperDescription {
    @include signature_12-16_semibold;
    padding: 0 16px;
  }

  .priceWrap {
    color: transparent;
    margin-top: auto;
    padding: 0 16px 16px;
  }

  .price {
    @include title_20-24_bold;
    color: transparent;
    background-color: $colorWhite;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(78deg, #1e68ab 10.13%, #ca0916 82.47%);
  }

</style>
