<template>
  <iframe frameborder="0"  :style="style" :src="attr.src"></iframe>
</template>

<script>
export default {
  name: "iframePlugin",
  props: {
    attribute: {},
    preview: false,
  },
  computed: {
    style() {
      const style = this.attribute.style;
      if (this.preview) {
        style.position = "absolute"
      } else {
        delete style.position
      }
      return this.$utils.formatStyle(this.attribute.style);
    },
    attr() {
      return this.attribute.attr;
    }
  }
}
</script>

<style scoped>

</style>
