<template>
  <footer id="footer">
    <div class="container">
      <div class="foot_content">
        THIS IS THE WEBSITE DESIGN BY ZHUDING
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'page-footer'
}
</script>

<style lang="scss" scoped>
  #footer {
    background: #fff;
    width: 100%;
    position: relative;
    z-index: 1;
    padding: .5em;
    color: #555;

    .foot_content {
      width: 100%;
      padding: 1em;
      font-size: .9em;
      text-align: center;
      word-spacing: 4px;
    }
  }
</style>


