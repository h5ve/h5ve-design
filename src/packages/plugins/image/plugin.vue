<template>
  <img class="image-plugin-container" :style="style" :src="url(attr.src)">
</template>

<script>
export default {
  name: "imagePlugin",
  inject: ["url"],
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
