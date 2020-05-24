<template lang="pug">
.card
  .card-header
    .input-group
      input.form-control(type='text', v-model.trim='section.name', placeholder='Section name', aria-describedby='sectionNameFeedback')
      .input-group-append
        button.btn.btn-danger(@click.prevent='sectionDelete')
          fa(:icon='["fas", "trash-alt"]')
          | &nbsp; Delete Section
      .invalid-feedback#sectionNameFeedback You must provide a name for this section.
  .card-body
    .card-text
      .form-group
        .input-group
          textarea.form-control(v-model.trim='rawQuestions', rows=6, placeholder='Questions (one per row)')
          .input-group-append
            button.btn.btn-primary(@click='rawQuestionsParse', type='button')
              fa(:icon='["fas", "check"]')
      
      QuestionEditor(v-for='(question, index) in section.questions', :question='question', :index='index', :key='question.id', s v-on:delete='questionDelete')
      SectionEditor(v-for='(subsection, index) in section.subsections', :section='subsection', :index='index', :key='subsection.id', v-on:delete='subsectionDelete')

      button.btn.btn-success(@click='subsectionAdd', type='button')
        fa(:icon='["fas", "plus-circle"]') 
        | &nbsp;Add Subsection
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Section } from "@/types";
import { required, minLength } from "vuelidate/lib/validators";
import { mutations } from "@/store";

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

  // Index passed by parent to be used when emitting event to delete this ection
  @Prop(Number) readonly index: number | undefined;

  // Contents of textarea for quick addition to list of questions
  private rawQuestions = "";

  // Default data type for each question
  private dataTypeDefault = "TextArea(3 rows)";

  // Emit a delete event to the Designer component to delete this section
  private sectionDelete(): void {
    this.$emit("delete", this.index);
  }

  // Handler for emitted event from child question to delete it
  private questionDelete(index: number): void {
    this.section.questions.splice(index, 1);
  }

  // Add a new subsection assigning it the next id from the store
  private subsectionAdd(): void {
    const subsection: Section = {
      id: mutations.nextId(),
      name: `Subsection ${this.section.subsections.length + 1}`,
      questions: [],
      subsections: [],
    };
    this.section.subsections.push(subsection);
  }

  // Handler for emitted event from child subsection to delete it
  private subsectionDelete(index: number): void {
    this.section.subsections.splice(index, 1);
  }

  // Convert lines in the textarea to new question array elements
  private rawQuestionsParse(): void {
    if (this.rawQuestions.length > 0) {
      const labels = this.rawQuestions.split("\n");
      for (const label of labels) {
        if (label !== "") {
          this.section.questions.push({
            id: mutations.nextId(),
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
