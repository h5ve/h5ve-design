<template>
  <div class="date-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item label="颜色">
        <div class="flex-row">
          字体：
          <el-color-picker style="margin-right: 16px;" v-model="plugin.style.color" show-alpha></el-color-picker>
          背景：
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('plugin.format')">
        <el-select
            style="width: 100%;"
            v-model="plugin.attr.format"
            :placeholder="$t('plugin.showFormatPlaceholder')">
          <el-option
              v-for="item in dateFormat"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plugin.fontSize')">
        <el-input-number controls-position="right" :min="0" v-model.number="plugin.style.fontSize"
                         :placeholder="$t('plugin.fontSizePlaceholder')"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('plugin.font')">
        <el-radio v-model="plugin.style.fontStyle" label="normal">{{ $t('plugin.normal') }}</el-radio>
        <el-radio v-model="plugin.style.fontStyle" label="italic">{{ $t('plugin.italic') }}</el-radio>
        <el-radio v-model="plugin.style.fontStyle" label="oblique">{{ $t('plugin.oblique') }}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('plugin.fontWeight')">
        <el-radio v-model="plugin.style.fontWeight" label="lighter">{{ $t('plugin.lighter') }}</el-radio>
        <el-radio v-model="plugin.style.fontWeight" label="normal">{{ $t('plugin.normal') }}</el-radio>
        <el-radio v-model="plugin.style.fontWeight" label="bold">{{ $t('plugin.bold') }}</el-radio>
      </el-form-item>
      <el-form-item class="layout-config" :label="$t('plugin.layout')">
        <el-radio v-model="plugin.style.textAlign" label="left">
          <svg-icon :style="{color: plugin.style.textAlign === 'left' ? '#409eff' : '#606266'}" icon-class="icon-left"/>
          {{ $t('plugin.left') }}
        </el-radio>
        <el-radio v-model="plugin.style.textAlign" label="center">
          <svg-icon :style="{color: plugin.style.textAlign === 'center' ? '#409eff' : '#606266'}"
                    icon-class="icon-center"/>
          {{ $t('plugin.center') }}
        </el-radio>
        <el-radio v-model="plugin.style.textAlign" label="right">
          <svg-icon :style="{color: plugin.style.textAlign === 'right' ? '#409eff' : '#606266'}"
                    icon-class="icon-right"/>
          {{ $t('plugin.right') }}
        </el-radio>
        <el-radio v-model="plugin.style.textAlign" label="justify">
          <svg-icon :style="{color: plugin.style.textAlign === 'justify' ? '#409eff' : '#606266'}"
                    icon-class="icon-between"/>
          {{ $t('plugin.justify') }}
        </el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import data from "@/packages/data/format";

export default {
  name: "dateConfig",
  data() {
    return {
      dateFormat: data.date
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
  }
}
</script>
<style lang="scss">
.layout-config {
  .el-radio__inner {
    display: none;
  }
}
</style>
