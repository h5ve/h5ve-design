import Vue from 'vue';
import svgIcon from '@/components/svg-icon';
Vue.component('svg-icon', svgIcon);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(require.context('./svg', false, /\.svg$/));