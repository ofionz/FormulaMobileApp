<template>
  <q-input
    ref="input"
    v-model="model"
    label-slot
    bottom-slots
    :type = 'type'
    :rules="validationRules"
    :class="$style.input"
  >
    <template v-if="label" v-slot:label>
      <div
        :class="$style.input_label"
        class="row items-center all-pointer-events"
      >
        {{ label }}
      </div>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "UiInput",
  props: {
    type: {},
    validationRules: {},
    label: {},
  },
  mounted() {

  },
  data() {
    return {
      model:'',
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" module>
//$

.input_label {
  color: $colorGray;
}
</style>
