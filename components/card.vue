<template>
  <div class="card">
    <div class="card_head">{{ title }}</div>
    <div class="card_content">
      <slot name="card_content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 1rem;
    
    .card_head {
      font-size: 1rem;
      padding: 1rem 1rem;
      background: #22282e;
      border-bottom: 1px solid #000;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .card_content {
      background: #454b4f;
      padding: 1rem 1rem;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
</style>


