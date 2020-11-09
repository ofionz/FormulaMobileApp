<template>
  <div>
    <ui-page-title
      :class="$style.title"
      @backward="$router.go(-1)"
      title="Курсант"
    >
    </ui-page-title>
    <span :class="$style.title_text">{{title}}</span>
    <div :class="$style.wrapper">
    <div :class="$style.history_header">
      <span></span>
      <span :class="$style.history__title">Дата и время</span>
      <span :class="$style.history__title">Статус</span>
      <span :class="$style.history__title">Инструктор</span>
    </div>
    <div v-for="(row, index) in history" :key = 'index' :class="$style.history">
      <span>{{index+1}}</span>
      <span>{{row.date}}</span>
      <span>{{row.state}}</span>
      <span>{{row.instructor}}</span>
      </div>
    </div>
    </div>
</template>

<script>
  import UiPageTitle from '../../components/UiPageTitle';
  export default {
    name: 'DrivingHistory',
    components: { UiPageTitle},
    data: () => {
      return {
        history: [
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},
          {date: '03.06.2020 в 08:00', state: "Состоявшееся", instructor: 'Ежов Иван Николаевич'},

        ]
      }
    }
  };
</script>

<style
  lang="scss"
  module
>
  //$
  .title {
    margin: 54px 16px 16px;
  }
.wrapper{
  overflow: scroll;
  margin-bottom: 60px;
  background-color: #f5f8fb;
}
  .history, .history_header {

    display: grid;
    grid-template-columns: 25px 150px 150px auto;
  }
  .history_header{
    padding: 16px 0 0;
  }
  .history:last-child{
    padding: 0 0 16px;
  }

  .history__title, .history__empty {
    color: #aaaaaa;
    padding-bottom: 10px;
  }

  .history span, .history_header span{
    text-align: center;
    padding: 0 20px 10px;
  }

  .history span:not(:last-child), .history_header span:not(:last-child) {
    border-right: 1px solid #d8dce4;
  }
</style>
