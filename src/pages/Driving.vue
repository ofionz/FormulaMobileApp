<template>
  <div>
    <UiCalendar :class="$style.calendar"></UiCalendar>
  </div>
</template>
<script>
  import UiCalendar from '../components/UiCalendar';
  export default {
    name: 'Driving',
    components: {
      UiCalendar
    }
  };
</script>

<style lang="scss" module>
.calendar {
  width: 100%;
  height: 300px;
}
</style>