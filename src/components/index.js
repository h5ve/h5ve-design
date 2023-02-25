import Vue from 'vue';

// 拖拽可调整大小
import draggableResizable from './draggable-resizable.vue';
import "./draggable-resizable.css";
Vue.component('draggable-resizable', draggableResizable);

// 拖拽不可调整大小
import draggable from 'vuedraggable';
Vue.component('draggable', draggable);

// 代码编辑器
import codeEditor from "./code-editor";
Vue.component('codeEditor', codeEditor);

// 选择素材
import material from "components/material";
Vue.component("material", material);

