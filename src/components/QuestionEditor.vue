<template lang="pug">
.form-group
  .input-group.input-group-sm
    .input-group-prepend
      .input-group-text
          input.required(type='checkbox', v-model='question.required', aria-label='Required', alt='Required')
    b-form-input.fifty-three(v-model.trim='question.label', :state='!!question.label', aria-label='Question', aria-describedby='questionLabelFeedback')
    b-form-select.custom-select(v-model='question.dataType', :options='options')
    .input-group-append
      b-dropdown.dropdown(text='', variant='outline-secondary', size='sm')
        b-dropdown-item.edit(v-b-modal='modalName(question.id)')
          fa.text-secondary(:icon='["fas", "edit"]')
          | &nbsp; Edit Values
        b-dropdown-item.delete(@click='questionDelete')
          fa.text-danger(:icon='["fas", "trash-alt"]')
          | &nbsp; Delete
  b-form-invalid-feedback#questionLabelFeedback(:state='!!question.label') You must provide a label for this question.

  b-modal(:id='modalName(question.id)', title='Edit List Values', @ok='rawValuesParse')
    textarea.form-control.values(rows=5, v-model.trim='rawValues', autofocus='')
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Question } from "@/types";
import { mutations } from "@/store";

@Component
export default class QuestionEditor extends Vue {
  @Prop({
    default: {
      id: mutations.nextId(),
      required: false,
      label: "",
      dataType: "TextArea(3 rows)",
      values: [],
    },
  })
  private question!: Question;

  private options: string[] = [
    "Checkbox",
    "Checkboxes",
    "Checkboxes - Heating Types",
    "Checkboxes - Roofing Materials",
    "Checkboxes - Roofing Styles",
    "Checkboxes - Flooring Materials",
    "Currency(8,2) - $",
    "Currency(8,2) - €",
    "Date",
    "Email",
    "Feet(5,0)",
    "Feet(5,2)",
    "Miles(3,1)",
    "Minutes(2,0)",
    "Number(10,0)",
    "Number(10,2)",
    "Percentage(3,2)",
    "Percentage(3,0)",
    "Phone",
    "Dropdown",
    "Dropdown - US States",
    "Dropdown - CA Provinces",
    "Radios",
    "Radios - Architectural Style",
    "Radios - Garage Type",
    "Radios - Yes/No",
    "Square Feet(10,0)",
    "Square Feet(10,2)",
    "Static HTML",
    "Text",
    "TextArea(3 rows)",
    "TextArea(8 rows)",
    "URL",
    "Year",
    "Years(3)",
    "ZIP Code",
    "ZIP Code +4",
  ];

  @Prop(Number) readonly index: number | undefined;

  // Create unique modal name/id corresponding to the question's id
  private modalName(id: number): string {
    return `modal${id}`;
  }

  // Convert array elements to lines for the textarea
  private rawValues =
    this.question.values.length > 0 ? this.question.values.join("\n") : "";

  // Emit event to parent to delete this question
  private questionDelete(): void {
    this.$emit("delete", this.index);
  }

  // Convert rows in the textarea to array elements
  private rawValuesParse(): void {
    if (this.rawValues.length > 0) {
      const values = this.rawValues.split("\n");
      this.question.values = values;
    }
  }
}
</script>

<style scoped lang="scss">
.fifty-three {
  width: 47%;
}
</style>
