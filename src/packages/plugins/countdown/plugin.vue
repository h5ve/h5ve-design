<template>
  <div class="countdown-plugin-container" :style="style">
    {{ countTime }}
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "countdownPlugin",
  props: {
    attribute: {},
    preview: false,
  },
  data() {
    return {
      countTime: ""
    }
  },
  watch: {
    "attribute.attr.date": {
      deep: true,
      immediate: true,
      handler(n) {
        if (n > 0) {
          clearInterval(this.timer);
          this.second = n;
          this.timer = setInterval(() => {
            this.countTime = this.$utils.formatCount((this.second), this.attribute.attr.format);
            if (this.second <= 0) {
              clearInterval(this.timer);
            }
          }, 1000)
        } else {
          clearInterval(this.timer);
        }
      }
    }
  },
  computed: {
    ...mapGetters(["entrance"]),
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

<style scoped lang="scss">
.countdown-plugin-container {
  &:after {
    display: inline-block;
    width: 100%;
    content: "";
  }
}
</style>
