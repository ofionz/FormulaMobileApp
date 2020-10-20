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
             url: "about",
             iconName: "road",
             label: "О нас",
           },
          {
            url: "prices",
            iconName: "money",
            label: "Услуги",
          },
           {
             url: "login",
             iconName: "key",
             label: "Войти",
           },
        ]
      }
    },
  }
</script>
<style lang="scss" module>

</style>