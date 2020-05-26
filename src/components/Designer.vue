<template lang="pug">
.container.mt-3
  form(novalidate, autocomplete='off')
    b-form-group
      b-form-input(v-model.trim='name', :state='!!name', :autofocus='"autofocus"', placeholder='Name of form', maxlength='80', aria-describedby='formNameFeedback')
      b-form-invalid-feedback#formNameFeedback You must provide a name for this form.

    SectionEditor(v-for='(section, index) in sections', :section='section', :index='index', :key='section.id', v-on:delete='sectionDelete')

    b-form-invalid-feedback.mb-3#sectionFeedback(:state='sections.length !== 0') At least one section must be added.

    button.btn.btn-secondary(@click='sectionAdd', type='button')
      fa(:icon='["fas", "plus-circle"]')
      | &nbsp;Add Section
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Section } from "@/types";
import { store, mutations } from "@/store";

@Component
export default class Designer extends Vue {
  private get name(): string {
    return store.data.name;
  }

  private set name(name: string) {
    mutations.nameSet(name);
  }

  private get sections(): Section[] {
    return store.data.sections;
  }

  // Handler for delete event emitted from child section
  private sectionDelete(index: number): void {
    mutations.sectionDelete(index);
  }

  // Add a new section using the next id from the store
  private sectionAdd(): void {
    const section: Section = {
      name: `Section ${store.data.sections.length + 1}`,
      id: mutations.nextId(),
      questions: [],
      subsections: [],
    };
    mutations.sectionAdd(section);
  }
}
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}
</style>
