<template>
  <div class="attribute-container">
    <div class="general-form">
      <component :is="plugin.config"/>
      <el-form size="mini" label-position="top">
        <el-form-item :label="$t('plugin.transparency')">
          <el-input-number
              :min="0"
              :max="100"
              :step="1"
              step-strictly
              style="width: 100%;"
              controls-position="right"
              v-model="opacity"/>
        </el-form-item>
        <el-form-item :label="$t('plugin.roundedCorners')">
          <el-input-number
              :min="0"
              :step="1"
              step-strictly
              style="width: 100%;"
              controls-position="right"
              v-model="plugin.style.borderRadius"/>
        </el-form-item>
        <el-form-item :label="$t('plugin.revolve')">
          <el-input-number
              :step="1"
              step-strictly
              style="width: 100%;"
              controls-position="right"
              v-model="plugin.style.rotateZ"/>
        </el-form-item>
        <el-form-item :label="$t('plugin.position')">
          <div class="flex-row">
            <el-input-number
                :min="0"
                style="margin-right: 16px;"
                controls-position="right"
                v-model="plugin.style.left"/>
            <el-input-number
                :min="0"
                controls-position="right"
                v-model="plugin.style.top"/>
          </div>
        </el-form-item>
        <el-form-item :label="$t('plugin.size')">
          <div class="flex-row">
            <el-input-number
                :min="0"
                style="margin-right: 16px;"
                controls-position="right"
                v-model="plugin.style.width"/>
            <el-input-number
                :min="0"
                controls-position="right"
                v-model="plugin.style.height"/>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "attribute",
  data() {
    return {
      opacity: 100
    }
  },
  computed: {
    ...mapGetters(["projectViews", "entrance", "active"]),
    canvas() {
      return this.projectViews[this.entrance].plugins;
    },
    plugin() {
      return this.canvas[this.active.plugin];
    }
  },
  watch: {
    "opacity"(n) {
      this.plugin.style.opacity = n / 100;
    }
  },
  updated() {
    this.opacity = Math.round(this.plugin.style.opacity * 100);
  }
}
</script>

<style scoped lang="scss">
.attribute-container {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.general-form {
  margin: 16px;

  .el-form-item__label {
    padding-bottom: 0 !important;
  }
}
</style>

<style>
.el-form-item__label {
  padding-bottom: 0 !important;
}
</style>
