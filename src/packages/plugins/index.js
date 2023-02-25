import Vue from 'vue'
// 加载组件
const Components = require.context('.', true, /\.vue$/)
Components.keys()
    .map(Components)
    .forEach((item) => {
        Vue.component(item.default.name, item.default)
    })
