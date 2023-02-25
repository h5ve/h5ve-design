<template>
  <div class="iframe-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item :label="$t('plugin.path')">
        <el-input v-model="plugin.attr.src" type="input"
                  :placeholder="$t('plugin.pathPlaceholder')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('plugin.mask')">
        <el-radio v-model="plugin.style.pointerEvents" label="none">{{ $t('plugin.yes') }}</el-radio>
        <el-radio v-model="plugin.style.pointerEvents" label=""> {{ $t('plugin.no') }}</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "iframeConfig",

  computed: {
    ...mapGetters(["projectViews", "entrance", "active"]),
    canvas() {
      return this.projectViews[this.entrance].plugins;
    },
    plugin() {
      return this.canvas[this.active.plugin];
    }
  }
}
</script>
