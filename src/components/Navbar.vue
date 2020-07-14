<template lang="pug">
nav.navbar.navbar-dark.bg-dark
  .container
    .navbar-brand 
      img(alt='Utilant logo', src='../assets/logo.png', height=25, width=209)
      | &nbsp;Fast Form Designer
    form.form-inline(novalidate='')
      label.btn.btn-outline-warning.upload(for='open')
        fa.mr-1(:icon='["fas", "folder-open"]') 
        | Open...
        input(id='upload', ref='uploadInput', type='file', accept='application/JSON', @change='open')
      button.btn.btn-outline-success.ml-2(id='download', type='button', @click='save')
        fa.mr-1(:icon='["fas", "file-download"]') 
        | Save
      button.btn.btn-outline-primary.ml-2(id='preview', type='button', v-b-modal.uploadModal)
        fa.mr-1(:icon='["fas", "cloud-upload-alt"]') 
        | Upload...
  b-modal(id='uploadModal', title='Upload to LC360', @ok='upload')
    form(novalidate='')
      .form-group
        label(for='targetServer') LC360 Website
        input.form-control(v-model.trim='targetUri', id='targetServer', aria-describedby='targetServerHelp', autofocus='', placeholder='https://example.losscontrol360.com')
        small.form-text.text-muted(id='targetServerHelp') Target server
      .form-group
        label(for='webApiId') Web API ID
        input.form-control(v-model.trim='tokenRequest.client_id', id='webApiId', aria-describedby='webApiIdHelp', placeholder='User name')
        small.form-text.text-muted(id='webApiIdHelp') LC360 user granted API access
      .form-group
        label(for='webApiId') Web API Secret
        input.form-control(v-model.trim='tokenRequest.client_secret',id='webApiSecret', aria-describedby='webApiSecretHelp', placeholder='Secret')
        small.form-text.text-muted(id='webApiSecretHelp') Secret copied from LC360 user interface
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, Vue, Ref } from "vue-property-decorator"
import axios from "axios"
import { store, mutations } from "@/store"

@Component
export default class Navbar extends Vue {
  @Ref()
  uploadInput!: HTMLInputElement

  // Upload modal's bindings
  private targetUri = ""
  private tokenRequest: any = {
    client_id: "",
    client_secret: "",
    grant_type: "client_credentials",
  }

  // Read JSON file into store
  private open(event: any): void {
    const files: FileList = event.target.files
    if (files.length <= 0) return
    const reader = new FileReader()
    reader.onload = () => {
      const resultJSON: any = reader.result
      const result = JSON.parse(resultJSON)
      mutations.storeDataSet(result)
      // Hack to reset file input's state so change event will work
      this.uploadInput.type = "text"
      this.uploadInput.type = "file"
    }
    reader.readAsText(files[0])
  }

  private async upload(): Promise<void> {
    // TODO: Add validation of form and error-handling
    const tokenResult: any = await axios.post(
      `${this.targetUri}/api/auth/token`,
      {
        body: this.tokenRequest,
      }
    )
    // tokenResult looks like { expires, issued, access_token, token_type, userName }
    const uploadResult = await axios.post(
      `${this.targetUri}/api/form-loader`,
      {
        body: store.data,
      },
      {
        headers: {
          Authorization: `Bearer: ${tokenResult.access_token}`,
        },
      }
    )
    console.log(uploadResult)
  }

  // Download store into JSON file
  private save(): void {
    const data = JSON.stringify(store.data)
    console.log("store before download", JSON.parse(data)) // extracts object from Observable
    const blob = new Blob([data], { type: "text/plain;charset=utf-8;" })
    const link: HTMLAnchorElement = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "form.json")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style scoped lang="scss">
input[type="file"] {
  display: none;
}
</style>
