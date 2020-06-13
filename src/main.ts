import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faPlusCircle,
  faTrashAlt,
  faCloudDownloadAlt,
  faUpload,
  faEye,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SectionEditor from "@/components/SectionEditor.vue";
import QuestionEditor from "@/components/QuestionEditor.vue";

library.add(
  faCheck,
  faPlusCircle,
  faTrashAlt,
  faCloudDownloadAlt,
  faUpload,
  faEye,
  faEdit
);
Vue.component("fa", FontAwesomeIcon);
// register globally as these are recursive
Vue.component("SectionEditor", SectionEditor);
Vue.component("QuestionEditor", QuestionEditor);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
