<template>
  <div v-if="preview || show" :style="style">
    <component
      v-for="(component, index) in plugins"
      :key="'h5ve-publish-container.' + index"
      :preview="true"
      :is="component.plugin"
      :attribute="component"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "h5vePublish",
  inject: ["publish", "equipment"],
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      preview: false
    }
  },
  computed: {
    ...mapGetters(["projectViews", "entrance"]),
    plugins() {
      return this.projectViews[this.entrance].plugins;
    },
    views() {
      return this.projectViews[this.entrance];
    },
    style() {
      const scale = 800 / this.views.width;
      let obj = {
        width: this.views.width + 'px',
        height: this.views.height + 'px',
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
        opacity: this.views.style.opacity / 100,
        background: `url(${this.views.attr.src}) no-repeat 50% ${this.views.style.backgroundColor}`
      }
      if (this.equipment) {
        delete obj.transform;
        delete obj.transformOrigin;
      }
      return obj;
    }
  },
  created() {
    this.preview = this.equipment;
  }
}
</script>
