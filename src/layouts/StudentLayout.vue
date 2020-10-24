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
             url: "/student/driving",
             iconName: "car",
             label: "Вождение",
           },
          {
            url: "/student/services",
            iconName: "stars",
            label: "Сервисы",
          },
           {
             url: "/student/cabinet",
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