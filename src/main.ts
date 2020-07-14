import Vue from "vue"
import "./plugins/bootstrap-vue"
import "./plugins/fontawesome"
import App from "./App.vue"
import "./registerServiceWorker"

import SectionEditor from "@/components/SectionEditor.vue"
import QuestionEditor from "@/components/QuestionEditor.vue"

// register globally as these are recursive
Vue.component("SectionEditor", SectionEditor)
Vue.component("QuestionEditor", QuestionEditor)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount("#app")
