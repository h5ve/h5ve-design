<template>
  <div class="button-plugin-container pointer"
       :style="{...style, lineHeight: style.height}"
       @click="buttonClick">
    {{ attr.name }}
  </div>
</template>

<script>
export default {
  name: "buttonPlugin",
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
  },
  methods: {
    buttonClick() {
      if(this.preview && this.attr.type === 'app') {
        if(this.attr.app) {
          TMPlayerApi.openTo(this.attr.app);
        }
      } else if (this.preview && this.attr.type === 'web') {
        this.attr.path && window.open(this.attr.path);
      } else if (this.preview && (this.attr.entrance || this.attr.entrance === 0)) {
        this.$store.commit("UPDATE_INFO", {
          key: "entrance",
          value: this.attr.entrance
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.button-plugin-container {
  overflow: hidden;

  &:after {
    display: inline-block;
    width: 100%;
    content: "";
  }
}
</style>
