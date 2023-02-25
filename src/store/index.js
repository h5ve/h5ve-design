import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import Cookies from 'js-cookie';
import project from "@/packages/data/project";

export default new Vuex.Store({
  state: {
    project,
    language: Cookies.get('language') || 'zh',
    history: {
      quash: [],
      recover: []
    },
    setting: {
      ruler: ['ruler'],
      disposition: "screen"
    },
    active: {
      plugin: 0
    },
    visual: {
      zoom: [100],
      lines: [{
        h: [0, 200],
        v: [0, 200]
      }]
    }
  },
  getters: {
    project: state => {
      return state.project;
    },
    quash: state => {
      return state.history.quash;
    },
    recover: state => {
      return state.history.recover;
    },
    projectViews: (state, getters) => {
      return state.project.views;
    },
    entrance: state => {
      return state.project.entrance;
    },
    duration: (state, getters) => {
      return state.project.views[getters.entrance].duration;
    },
    ruler: state => {
      return state.setting.ruler;
    },
    rulerStatus: (state, getters) => {
      return getters.ruler.includes('ruler');
    },
    referLineStatus: (state, getters) => {
      return getters.ruler.includes('referLine');
    },
    disposition: state => {
      return state.setting.disposition;
    },
    active: state => {
      return state.active;
    },
    visual: state => {
      return state.visual;
    }
  },
  mutations: {
    // 设置辅助线
    SET_LINES: (state, lines) => {
      let visual = JSON.parse(JSON.stringify(state.visual))
      visual.lines[state.project.entrance] = lines;
      state.visual = visual;
    },

    // 设置语言
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    /**
     * @param state
     * @param payload
     * @constructor
     * 导入项目
     */
    IMPORT_PROJECT: ((state, payload) => {
      state.project = payload.value;
    }),

    /**
     * 修改当前时长
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_DURATION: ((state, payload) => {
      const {duration} = payload;
      state.project.views[state.project.entrance].duration = duration;
    }),

    /**
     * 修改当前画布组件属性
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_PLUGIN: (state, payload) => {
      const {viewIndex, pluginIndex, key, value} = payload;
      state.project.views[viewIndex].plugins[pluginIndex][key] = value;
    },
    /**
     * 修改项目信息
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_INFO: (state, payload) => {
      const {key, value} = payload;
      state.project[key] = value;
    },
    /**
     * 修改项目页面
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_VIEW: (state, payload) => {
      const {index, number, value} = payload;
      if ((index || index === 0) && number && value) {
        state.project.views.splice(index, number, JSON.parse(JSON.stringify(value)));
      } else if ((index || index === 0) && number) {
        state.project.views.splice(index, number);
      } else {
        state.project.views.push(JSON.parse(JSON.stringify(value)));
      }
    },

    /**
     * 修改页面组件
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_VIEW_PLUGIN: ((state, payload) => {
      const {index, number, value, draggable} = payload;
      if ((index || index === 0) && number) {
        state.project.views[state.project.entrance].plugins.splice(index, number);
      } else if (draggable && value) {
        state.project.views[state.project.entrance].plugins = value;
      } else if (value) {
        state.project.views[state.project.entrance].plugins.push(JSON.parse(JSON.stringify(value)));
      } else {
        state.project.views[state.project.entrance].plugins.splice(0);
      }
    }),

    /**
     * 修改刻度尺与辅助线状态
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_RULER: ((state, payload) => {
      const {value} = payload;
      const ruler = state.setting.ruler;
      const flag = ruler.includes(value);
      if (flag) {
        if (value === 'ruler') {
          state.setting.ruler = []
        } else {
          const index = ruler.findIndex(item => item === value);
          state.setting.ruler.splice(index, 1);
        }
      } else {
        if (value === 'referLine') {
          state.setting.ruler = ['ruler', 'referLine'];
        } else {
          state.setting.ruler.push(value);
        }
      }
    }),

    /**
     * 修改设置属性
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_SETTING: ((state, payload) => {
      const {key, value} = payload;
      state.setting[key] = value;
    }),

    /**
     * 修改指定控件激活状态
     */
    UPDATE_ACTIVE: ((state, payload) => {
      const {key, value} = payload;
      state.active[key] = value;
    }),

    /**
     * 更新视图配置
     */
    UPDATE_VISUAL: ((state, payload) => {
      const {index, number, key, value} = payload;
      if ((index || index === 0) && number && value) {
        state.visual[key].splice(index, number, value);
      } else if ((index || index === 0) && number) {
        state.visual[key].splice(index, number);
      } else if (value) {
        state.visual[key].push(JSON.parse(JSON.stringify(value)));
      }
    })
  },
  actions: {},
  modules: {}
})
