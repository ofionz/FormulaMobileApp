<template>
  <div :class="$style.container">
    <UiSwiper class="q-mb-xl" :swiper-data="swiperData"> </UiSwiper>
    <UiSwiper class="q-mb-xl" :swiper-data="swiperData2"> </UiSwiper>
    <UiSwiper :swiper-data="swiperData3"> </UiSwiper>
  </div>
</template>

<script>
import UiSwiper from "../components/UiSwiper";
export default {
  components: {
    UiSwiper
  },
  data() {
    return {
      swiperData: {
        name: 'Акции',
        slides: [
          {
            imageURL:"https://pictures.topspeed.com/IMG/jpg/200604/zap-introduces-all-e.jpg",
            imageDescription: "Описание 1 "
          },
          {
            imageURL:"https://img1.freepng.ru/20180402/ote/kisspng-car-responsive-web-design-driver-s-education-drivi-driving-school-5ac2959dab6402.978976481522701725702.jpg",
            imageDescription: "Описание"
          }
          ,
          {
            imageURL:"https://автоинфо.рус/wp-content/uploads/2020/09/BMW-M3-and-BMW-M4-front-260x160.jpg",
            imageDescription: "Описание"
          }
          ,
          {
            imageURL:"https://автоинфо.рус/wp-content/uploads/2020/09/BMW-M3-and-BMW-M4-front-260x160.jpg",
            imageDescription: "Описание"
          }
          ,
          {
            imageURL:"https://автоинфо.рус/wp-content/uploads/2020/09/BMW-M3-and-BMW-M4-front-260x160.jpg",
            imageDescription: "Описание"
          }
        ]
      },
      swiperData2: {
        name: 'Категория B',
        slides: [
          {
            price: "15 900₽",
            title: "Акционный",
            description: ["56 часов практики","1 бесплатный внутр. экзамен"]
          },
          {
            description: ["6 часов практики","4 бесплатный внутр. экзамен"],
            price: "1 500₽",
            title: "Бюджетный"
          }
          ,
          {
            description: ["0 часов практики","Права без экзамена"],
            price: "350 000₽",
            title: "Люкс"
          },
          {
            price: "15 900₽",
            title: "Акционный",
            description: ["56 часов практики","1 бесплатный внутр. экзамен"]
          },
          {
            price: "15 900₽",
            title: "Акционный",
            description: ["56 часов практики","1 бесплатный внутр. экзамен"]
          },
        ]
      },
      swiperData3: {
        name: 'Категория A',
        slides: [
          {
            price: "15 900₽",
            title: "Акционный",
            description: ["56 часов практики","1 бесплатный внутр. экзамен"]
          },
          {
            description: ["6 часов практики","4 бесплатный внутр. экзамен"],
            price: "1 500₽",
            title: "Бюджетный"
          }
          ,
          {
            description: ["0 часов практики","Права без экзамена"],
            price: "350 000₽",
            title: "Люкс"
          },
          {
            price: "15 900₽",
            title: "Акционный",
            description: ["56 часов практики","1 бесплатный внутр. экзамен"]
          },
          {
            price: "15 900₽",
            title: "Акционный",
            description: ["56 часов практики","1 бесплатный внутр. экзамен"]
          },
        ]
      }
    };
  }
};
</script>
<style lang="scss" module>
  .container {
    padding:  28px 0 70px 16px;
  }
</style>
