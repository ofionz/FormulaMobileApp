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
             name: "driving",
             iconName: "car",
             label: "Вождение",
           },
          // {
          //   name: "services",
          //   iconName: "stars",
          //   label: "Сервисы",
          // },
           {
             name: "cabinet",
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