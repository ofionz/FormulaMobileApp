<template>
<UiLayout :tabs = 'TABS_CONFIG'>

</UiLayout>
</template>

<script>
  import UiLayout from '../components/UiLayout';

  export default {
    components: {
      UiLayout
    },
    data () {
      return {
         TABS_CONFIG : [
           {
             name: "instructorDriving",
             iconName: "car",
             label: "Вождение",
           },
          {
            name: "instructorServices",
            iconName: "stars",
            label: "Сервисы",
          },
           {
             name: "instructorCabinet",
             iconName: "road",
             label: "Кабинет",
           },
        ]
      }
    },
  }
</script>
<style lang="scss" module>

</style>