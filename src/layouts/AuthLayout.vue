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
             name: "about",
             iconName: "road",
             label: "О нас",
           },
          {
            name: "prices",
            iconName: "money",
            label: "Услуги",
          },
           {
             name: "login",
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