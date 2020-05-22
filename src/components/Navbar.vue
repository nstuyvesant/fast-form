<template lang="pug">
nav.navbar.navbar-dark.bg-dark
  .container
    .navbar-brand Fast Form
    form.form-inline(novalidate='')
      label.btn.btn-outline-warning(for='upload')
        fa(:icon='["fas", "upload"]') 
        | &nbsp; Upload
        input(id='upload', type='file', accept='application/JSON', @change='upload')
      button.btn.btn-outline-primary.ml-2(type='button', @click='preview')
        fa(:icon='["fas", "eye"]') 
        | &nbsp; Preview
      button.btn.btn-outline-success.ml-2(type='button', @click='download')
        fa(:icon='["fas", "cloud-download-alt"]') 
        | &nbsp; Download
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { store, mutations } from "@/store";

@Component
export default class Navbar extends Vue {
  private files: string[] = [];

  private upload(event: any): void {
    const files : FileList = event.target.files;
    if (files.length <= 0) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const resultJSON: any = reader.result;
      const result = JSON.parse(resultJSON);
      console.log(result);
      // TODO: set store = result;
    }
    reader.readAsText(files[0]);
  }

  private preview(): void {
    alert("Preview");
  }

  private download(): void {
    alert(JSON.stringify(store));
    // const data = JSON.stringify(store);
    // const blob = new Blob([data], { type: "text/plain;charset=utf-8;" });
    // const link: HTMLAnchorElement = document.createElement("a");
    // if (link.download !== undefined) {
    //   const url = URL.createObjectURL(blob);
    //   link.setAttribute("href", url);
    //   link.setAttribute("download", "form.json");
    //   link.style.visibility = "hidden";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }
  }
}
</script>

<style scoped lang="scss">
input[type="file"] {
    display: none;
}
</style>
