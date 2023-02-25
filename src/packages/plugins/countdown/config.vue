<template>
  <div class="countdown-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item :label="$t('plugin.color')">
        <div class="flex-row">
          {{ $t('plugin.font') }}：
          <el-color-picker style="margin-right: 16px;" v-model="plugin.style.color" show-alpha></el-color-picker>
          {{ $t('plugin.backgroundColor') }}：
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('plugin.deadline')">
        <el-date-picker
            v-model="plugin.attr.date"
            type="datetime"
            value-format="timestamp"
            :placeholder="$t('plugin.chooseDate')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('plugin.format')">
        <el-select style="width: 100%;" v-model="plugin.attr.format"
                   :placeholder="$t('plugin.showFormatPlaceholder')">
          <el-option v-for="item in countdownFormat"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('plugin.font')">
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
import data from "@/packages/data/format";
import {mapGetters} from "vuex";

export default {
  name: "countdownConfig",
  data() {
    return {
      countdownFormat: data.countdown
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
