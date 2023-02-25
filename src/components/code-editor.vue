<template>
  <div style="position:relative;">
    <div style="border: 1px solid #c9d8db; overflow-y: auto;" :style="{height: height + 'px'}">
      <textarea id="code-editor"></textarea>
    </div>
    <span class="copy pointer"
          style="position: absolute;
          right: 10px;
          top: 10px;
          color: #fff;
          padding: 1px 10px;
          border-radius: 3px;
          background-color: #409eff;"
          @click="copy">{{ $t('tips.copy') }}</span>
    <el-select
        v-show="!readonly"
        size="mini"
        v-model="languageType"
        @change="changeLanguage"
        placeholder="选择语言"
        style="margin-top: 5px; width: 110px; position: absolute; bottom: 5px; right: 5px;z-index: 10;">
      <el-option label="Java" value="Java"></el-option>
      <el-option label="C语言" value="C语言"></el-option>
      <el-option label="JavaScript" value="JavaScript"></el-option>
      <el-option label="Vue" value="vue"></el-option>
      <el-option label="C++" value="C++"></el-option>
      <el-option label="TypeScript" value="TypeScript"></el-option>
      <el-option label="Php" value="Php"></el-option>
      <el-option label="C#" value="C#"></el-option>
      <el-option label="小程序" value="小程序"></el-option>
      <el-option label="uni-app" value="uni-app"></el-option>
      <el-option label="Python" value="Python"></el-option>
      <el-option label="数据库" value="数据库"></el-option>
    </el-select>
  </div>
</template>

<script>
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
import 'codemirror/theme/idea.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/http/http'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/selection/active-line'
import copyString from './utils/copyString'

export default {
  name: "codeEditor",
  data() {
    return {
      languageType: "vue"
    }
  },
  props: {
    height: {
      type: Number,
      default: 500
    },
    code: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeLanguage(data) {
      this.CodeMirrorEditor.setOption("mode", data)
    },
    copy() {
      try {
        const code = this.CodeMirrorEditor.getValue();
        copyString({
          text: code
        }).then(() => {
          this.$notify({
            title: '系统提示',
            message: '已复制',
            type: 'success'
          })
        }).catch(() => {
          this.$notify({
            title: '系统提示',
            message: '复制失败',
            type: 'warning'
          })
        })
      } catch (e) {
        this.$notify({
          title: '系统提示',
          message: '复制失败',
          type: 'warning'
        })
      }
    }
  },
  mounted() {
    this.CodeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
      mode: 'vue',
      smartIndent: true,
      theme: 'idea',
      readOnly: this.readonly,
      styleActiveLine: true,
      extraKeys: {"Ctrl": "autocomplete"},
      lineNumbers: true
    })
    this.CodeMirrorEditor.setValue(this.code);
    this.CodeMirrorEditor.on("changes", _ => {
      this.$emit("input", this.CodeMirrorEditor.getValue())
      this.$emit("changes", this.language)
    })
  }
}
</script>
