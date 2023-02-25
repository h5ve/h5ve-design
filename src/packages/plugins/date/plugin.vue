<template>
  <div class="date-plugin-container" :style="style">
    {{ date }}
  </div>
</template>

<script>
export default {
  name: "datePlugin",
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
    },
    date() {
      return this.$utils.formatDate(this.attribute.attr.date, this.attribute.attr.format);
    }
  },
  created() {
    setInterval(() => {
      this.attribute.attr.date = new Date().getTime();
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.date-plugin-container {
  &:after {
    display: inline-block;
    width: 100%;
    content: "";
  }
}
</style>
