import Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faCheck,
  faPlusCircle,
  faTrashAlt,
  faFileDownload,
  faFolderOpen,
  faCloudUploadAlt,
  faUpload,
  faEye,
  faEdit,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(
  faCheck,
  faPlusCircle,
  faTrashAlt,
  faFileDownload,
  faFolderOpen,
  faCloudUploadAlt,
  faUpload,
  faEye,
  faEdit
)

Vue.component("fa", FontAwesomeIcon)
