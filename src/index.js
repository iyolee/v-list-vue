import VList from './components/v-list.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VList', VList)
}

VList.install = function (Vue) {
  Vue.component(VList.name, VList)
}

export default VList;