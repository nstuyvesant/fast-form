<template lang="pug">
.card
  .card-header
    .input-group
      input.form-control(type='text', v-model.trim='section.name', placeholder='Section name')
      .input-group-append
        button.btn.btn-danger(@click.prevent='sectionDelete')
          fa(:icon='["fas", "trash-alt"]')
          | &nbsp; Delete Section
  .card-body
    .card-text
      .form-group
        .input-group
          textarea.form-control(v-model.trim='rawQuestions', rows=6, placeholder='Questions (one per row)')
          .input-group-append
            button.btn.btn-primary(@click='rawQuestionsParse', type='button')
              fa(:icon='["fas", "check"]')
      
      QuestionEditor(v-for='(question, index) in section.questions', :question='question', :index='index', v-on:delete='questionDelete')
      SectionEditor(v-for='(subsection, index) in section.subsections', :section='subsection', :index='index', v-on:delete='subsectionDelete')

      button.btn.btn-success(@click='subsectionAdd', type='button')
        fa(:icon='["fas", "plus-circle"]') 
        | &nbsp;Add Subsection
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Section } from "@/types";
import { required, minLength } from "vuelidate/lib/validators";

@Component({
  validations: {
    section: {
      name: { required },
      questions: {
        minLength: minLength(1),
      },
    },
  },
})
export default class SectionEditor extends Vue {
  @Prop({
    default: {
      name: "",
      questions: [],
      subsections: [],
    },
  })
  private section!: Section;

  private rawQuestions = "";
  private dataTypeDefault = "TextArea(3 rows)";

  @Prop(Number) readonly index: number | undefined;

  private sectionDelete(): void {
    this.$emit("delete", this.index);
  }

  private questionDelete(index: number): void {
    this.section.questions.splice(index, 1);
  }

  private subsectionAdd(): void {
    const subsection: Section = {
      name: `Subsection ${this.section.subsections.length + 1}`,
      questions: [],
      subsections: [],
    };
    this.section.subsections.push(subsection);
  }

  private subsectionDelete(index: number): void {
    this.section.subsections.splice(index, 1);
  }

  private rawQuestionsParse(): void {
    if (this.rawQuestions.length > 0) {
      const labels = this.rawQuestions.split("\n");
      for (const label of labels) {
        if (label !== "") {
          this.section.questions.push({
            required: false,
            label,
            dataType: this.dataTypeDefault,
            values: [],
          });
        }
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
