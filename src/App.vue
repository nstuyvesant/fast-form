<template lang="pug">
#app
  Navbar
  Designer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import Designer from "./components/Designer.vue";

@Component({
  components: {
    Navbar,
    Designer,
  },
})
export default class App extends Vue {}
</script>
