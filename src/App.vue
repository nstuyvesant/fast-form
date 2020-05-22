<template lang="pug">
#app
  Navbar
  Designer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import Designer from "./components/Designer.vue";

// Nice article on state management
// https://vueschool.io/articles/vuejs-tutorials/deep-dive-into-vue-state-management/
// Perhaps manage the form here and pass as props to Navbar and Designer and have them emit
// events so we can dumb this thing down?
@Component({
  components: {
    Navbar,
    Designer,
  },
})
export default class App extends Vue {}
</script>
