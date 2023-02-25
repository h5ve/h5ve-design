<template>
  <div class="text-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item :label="$t('plugin.textContent')">
        <el-input style="font-size: 15px;" v-model="plugin.attr.text" :rows="5" type="textarea"
                  placeholder="请输入文本内容"></el-input>
      </el-form-item>
      <el-form-item :label="$t('plugin.color')">
        <div class="flex-row">
          {{$t('plugin.font')}}：
          <el-color-picker style="margin-right: 16px;" v-model="plugin.style.color" show-alpha></el-color-picker>
          {{ $t('plugin.background') }}：
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('plugin.fontSize')">
        <el-input-number style="width: 100%;" controls-position="right" :min="0" v-model.number="plugin.style.fontSize"
                         placeholder="请输入字体大小"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('plugin.howManyLines')">
        <el-input-number style="width: 100%;" step-strictly controls-position="right" :min="0" :step="1"
                         v-model.number="plugin.style.lineClamp" :placeholder="$t('plugin.howManyLines')"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('plugin.font')">
        <el-radio v-model="plugin.style.fontStyle" label="normal">{{ $t('plugin.normal') }}</el-radio>
        <el-radio v-model="plugin.style.fontStyle" label="italic">{{ $t('plugin.italic')  }}</el-radio>
        <el-radio v-model="plugin.style.fontStyle" label="oblique">{{  $t('plugin.oblique')  }}</el-radio>
      </el-form-item>
      <el-form-item label="字重">
        <el-radio v-model="plugin.style.fontWeight" label="lighter">{{  $t('plugin.lighter') }}</el-radio>
        <el-radio v-model="plugin.style.fontWeight" label="normal">{{ $t('plugin.normal') }}</el-radio>
        <el-radio v-model="plugin.style.fontWeight" label="bold">{{ $t('plugin.bold')  }}</el-radio>
      </el-form-item>
      <el-form-item label="是否显示滚动条">
        <el-radio v-model="plugin.style.overflow" label="auto">{{ $t('plugin.yes') }}</el-radio>
        <el-radio v-model="plugin.style.overflow" label="hidden">{{ $t('plugin.no') }}</el-radio>
      </el-form-item>
      <el-form-item class="layout-config" :label="$t('plugin.layout')">
        <el-radio v-model="plugin.style.textAlign" label="left">
          <svg-icon :style="{color: plugin.style.textAlign === 'left' ? '#409eff' : '#606266'}" icon-class="icon-left"/>
          {{ $t('plugin.left') }}
        </el-radio>
        <el-radio v-model="plugin.style.textAlign" label="center">
          <svg-icon :style="{color: plugin.style.textAlign === 'center' ? '#409eff' : '#606266'}" icon-class="icon-center"/>
          {{ $t('plugin.center') }}</el-radio>
        <el-radio v-model="plugin.style.textAlign" label="right">
          <svg-icon :style="{color: plugin.style.textAlign === 'right' ? '#409eff' : '#606266'}" icon-class="icon-right"/>
          {{ $t('plugin.right') }}</el-radio>
        <el-radio v-model="plugin.style.textAlign" label="justify">
          <svg-icon :style="{color: plugin.style.textAlign === 'justify' ? '#409eff' : '#606266'}" icon-class="icon-between"/>
          {{ $t('plugin.justify') }}</el-radio>
      </el-form-item>
      <el-form-item label="动画">
        <el-radio v-model="plugin.attr.animation.animationName" label="">{{ $t('plugin.static') }}</el-radio>
        <el-radio v-model="plugin.attr.animation.animationName" label="toLeft">{{ $t('plugin.toLeft') }}</el-radio>
        <el-radio v-model="plugin.attr.animation.animationName" label="toRight">{{ $t('plugin.toRight') }}</el-radio>
        <el-radio v-model="plugin.attr.animation.animationName" label="toTop">{{ $t('plugin.toTop') }}</el-radio>
        <el-radio v-model="plugin.attr.animation.animationName" label="toBottom">{{ $t('plugin.toBottom') }}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('plugin.cycle')">
        <el-input-number style="width: 100%;" controls-position="right" :min="0"
                         v-model.number="plugin.attr.animation.animationDuration"
                         placeholder="请输入动画周期"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('plugin.readAloud')">
        <el-radio v-model="plugin.attr.readAloud" :label="true">{{ $t('plugin.yes') }}</el-radio>
        <el-radio v-model="plugin.attr.readAloud" :label="false">{{ $t('plugin.no') }}</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "textConfig",
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
