<template>
<div class="q-pa-md">
  <UiPageTitle :class="$style.title" @backward = backward title="История уведомлений"> </UiPageTitle>
  <div>
    <ul :class="$style.notification_list">
      <li
        v-for="(group, index) in notifications"
        :key="index"
        class="flex column"
      >
        <span :class="$style.group_date">{{ group.date }}</span>
        <ul :class="$style.notification_list">
          <li
            v-for="(notification, index) in group.notifications"
            :key="index"
            class="flex column"
            :class="$style.notification"
          >
            <span  :class="$style.notification_time" > {{notification.time}}</span>
            <span  :class="$style.notification_text"> {{notification.text}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import UiPageTitle from '../../components/UiPageTitle';
  export default {
    name: 'CabinetHistory',
    components: {
      UiPageTitle
    },
    data() {
      return {
        notifications: [],
      };
    },
    mounted() {
      this.notifications = this.$store.getters['notifications/getNotificationsList'];
    },
    methods: {
      backward() {
        this.$router.go(-1);
      },
    }
  };
</script>

<style lang="scss" module>
  //$
  .title {
    margin: 38px 0 26px;
  }
.group_date {
  @include signature_12-16_semibold;
  color: $colorGray;
  margin: 30px auto 8px;
}
  .notification_list {
    margin: 0;
    padding: 0;
  }

  .notification:not(:last-child) {
    border-bottom: 1px solid $colorGray6;
    padding-bottom: 16px;
  }
  .notification:not(:first-child) {
      margin-top: 16px;
    }
  .notification:last-child {
    margin-bottom: 32px;
  }

  .notification_time {
    @include signature_12-16_semibold;
    color: $colorGray;

  }

  .notification_text {
   @include text_16-22_medium;
  }

</style>