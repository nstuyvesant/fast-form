<template lang="pug">
.card
  .card-header
      b-input-group
        b-form-input(id='sectionName', v-model.trim='section.name', :state='!!section.name', placeholder='Section name', maxlength='80', aria-describedby='sectionNameFeedback')
        b-input-group-append
          b-button.delete-section(@click.prevent='sectionDelete', variant='danger')
            fa(:icon='["fas", "trash-alt"]')
            | &nbsp; Delete Section
      b-form-invalid-feedback#sectionNameFeedback(:state='!!section.name') You must provide a name for this section.
  .card-body
    .card-text
      .form-group
        .input-group
          textarea.form-control.questions(v-model.trim='rawQuestions', rows=6, placeholder='Questions (one per row) then click check on right')
          .input-group-append
            button.btn.btn-secondary.check(@click='rawQuestionsParse', type='button')
              fa(:icon='["fas", "check"]')
      
      QuestionEditor(v-for='(question, index) in section.questions', :question='question', :index='index', :key='question.id', s v-on:delete='questionDelete')
      b-form-invalid-feedback.mb-3#questionsFeedback(:state='section.questions.length !== 0') At least one question must be added.

      SectionEditor(v-for='(subsection, index) in section.subsections', :section='subsection', :index='index', :key='subsection.id', v-on:delete='subsectionDelete')

      button.btn.btn-success.add-subsection(@click='subsectionAdd', type='button')
        fa(:icon='["fas", "plus-circle"]') 
        | &nbsp;Add Subsection
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Section } from "@/types";
import { mutations } from "@/store";

@Component
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
  private dataTypeDefault = "Text(3 rows)";

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
      this.rawQuestions = "";
    }
  }
}
</script>
