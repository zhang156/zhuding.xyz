<template>
  <div class="zSelect">
    <select @change="change">
      <option 
        v-for="item in options" 
        :key="item.value" 
        :value="item.value" 
        :selected="value===item.value">{{ item.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'zSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [Number, String],
    options: Array
  },
  data () {
    return {

    }
  },
  methods: {
    change (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .zSelect {
    display: inline-block;
    padding: 10px;

    select {
      display: block;
      width: 120px;
      height: 30px;
      border-radius: 5px;

      &:focus {
        outline: 0;
      }

      option {

      }
    }
  }
</style>


